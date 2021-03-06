﻿// <auto-generated />
using BoucleTranscription.Repositories;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace BoucleTranscription.Migrations
{
    [DbContext(typeof(BoucleDataContext))]
    [Migration("20200302224821_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "3.1.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("BoucleTranscription.Models.Clip", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnName("id")
                        .HasColumnType("integer")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<int>("EndTime")
                        .HasColumnName("end_time")
                        .HasColumnType("integer");

                    b.Property<int>("StartTime")
                        .HasColumnName("start_time")
                        .HasColumnType("integer");

                    b.Property<string>("Transcription")
                        .HasColumnName("transcription")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("clip");
                });
#pragma warning restore 612, 618
        }
    }
}
