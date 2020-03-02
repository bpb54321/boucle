using System;
using System.Net.Http;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;
using System.Net.Http.Headers;
using Newtonsoft.Json;
using BoucleTranscription;
using BoucleTranscription.Repositories;

namespace BoucleTransriptionTests.Integration
{
    public class TestBase : IDisposable
    {
        protected HttpClient TestClient;

        protected BoucleDataContext BoucleDataContext;

        protected void InitializeClient(string databaseName)
        {
            var appFactory = new WebApplicationFactory<Startup>().WithWebHostBuilder(builder =>
            {
                builder.ConfigureServices(services =>
                {
                    var descriptor = services.SingleOrDefault(
                        d => d.ServiceType ==
                             typeof(DbContextOptions<BoucleDataContext>));

                    if (descriptor != null)
                    {
                        services.Remove(descriptor);
                    }

                    services.AddDbContext<BoucleDataContext>(options =>
                    {
                        options.UseInMemoryDatabase(databaseName);
                    });

                    var sp = services.BuildServiceProvider();
                    var scope = sp.CreateScope();
                    var scopedServices = scope.ServiceProvider;
                    var db = scopedServices.GetRequiredService<BoucleDataContext>();
                    db.Database.EnsureCreated();

                    BoucleDataContext = db;
                });
            });

            TestClient = appFactory.CreateClient();
        }

        protected ByteArrayContent SerializeObject(Object obj)
        {
            var jsonPayload = JsonConvert.SerializeObject(obj);
            var buffer = System.Text.Encoding.UTF8.GetBytes(jsonPayload);
            var byteContent = new ByteArrayContent(buffer);
            byteContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            return byteContent;
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                TestClient?.Dispose();
                BoucleDataContext?.Dispose();
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }


}
