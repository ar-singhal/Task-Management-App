USE [master]
GO
/****** Object:  Database [task_mgmtDB]    Script Date: 10-02-2024 01:21:48 ******/
CREATE DATABASE [task_mgmtDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'task_mgmtDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\task_mgmtDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'task_mgmtDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL13.MSSQLSERVER\MSSQL\DATA\task_mgmtDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
GO
ALTER DATABASE [task_mgmtDB] SET COMPATIBILITY_LEVEL = 130
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [task_mgmtDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [task_mgmtDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [task_mgmtDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [task_mgmtDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [task_mgmtDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [task_mgmtDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [task_mgmtDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [task_mgmtDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [task_mgmtDB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [task_mgmtDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [task_mgmtDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [task_mgmtDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [task_mgmtDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [task_mgmtDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [task_mgmtDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [task_mgmtDB] SET  ENABLE_BROKER 
GO
ALTER DATABASE [task_mgmtDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [task_mgmtDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [task_mgmtDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [task_mgmtDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [task_mgmtDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [task_mgmtDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [task_mgmtDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [task_mgmtDB] SET RECOVERY FULL 
GO
ALTER DATABASE [task_mgmtDB] SET  MULTI_USER 
GO
ALTER DATABASE [task_mgmtDB] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [task_mgmtDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [task_mgmtDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [task_mgmtDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [task_mgmtDB] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'task_mgmtDB', N'ON'
GO
ALTER DATABASE [task_mgmtDB] SET QUERY_STORE = OFF
GO
USE [task_mgmtDB]
GO
ALTER DATABASE SCOPED CONFIGURATION SET LEGACY_CARDINALITY_ESTIMATION = OFF;
GO
ALTER DATABASE SCOPED CONFIGURATION SET MAXDOP = 0;
GO
ALTER DATABASE SCOPED CONFIGURATION SET PARAMETER_SNIFFING = ON;
GO
ALTER DATABASE SCOPED CONFIGURATION SET QUERY_OPTIMIZER_HOTFIXES = OFF;
GO
USE [task_mgmtDB]
GO
/****** Object:  Table [dbo].[taskTbl]    Script Date: 10-02-2024 01:21:48 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[taskTbl](
	[taskId] [int] IDENTITY(1,1) NOT NULL,
	[title] [varchar](50) NOT NULL,
	[descript] [varchar](255) NULL,
	[due_date] [date] NULL,
	[created_date] [datetime] NULL,
	[status] [varchar](15) NULL,
PRIMARY KEY CLUSTERED 
(
	[taskId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[taskTbl] ON 

INSERT [dbo].[taskTbl] ([taskId], [title], [descript], [due_date], [created_date], [status]) VALUES (1, N'test-title1', N'insert from db', CAST(N'2024-05-03' AS Date), CAST(N'2024-02-07T02:10:55.833' AS DateTime), N'completed')
INSERT [dbo].[taskTbl] ([taskId], [title], [descript], [due_date], [created_date], [status]) VALUES (2, N'Updated Task Title', N'Updated Task Description', CAST(N'2024-02-25' AS Date), CAST(N'2024-02-07T02:42:29.987' AS DateTime), N'Update status')
INSERT [dbo].[taskTbl] ([taskId], [title], [descript], [due_date], [created_date], [status]) VALUES (1003, N'creating task', N'Actual testing task 1', CAST(N'2024-02-13' AS Date), CAST(N'2024-02-09T23:54:46.487' AS DateTime), N'pending')
INSERT [dbo].[taskTbl] ([taskId], [title], [descript], [due_date], [created_date], [status]) VALUES (1004, N'testing3', N'post-request-postman testing', CAST(N'2024-02-13' AS Date), CAST(N'2024-02-10T00:00:03.140' AS DateTime), N'pending')
INSERT [dbo].[taskTbl] ([taskId], [title], [descript], [due_date], [created_date], [status]) VALUES (1005, N'creating task 2', N'testing actual tasks 2', CAST(N'2024-02-14' AS Date), CAST(N'2024-02-10T00:02:38.300' AS DateTime), N'pending')
SET IDENTITY_INSERT [dbo].[taskTbl] OFF
GO
ALTER TABLE [dbo].[taskTbl] ADD  DEFAULT (getdate()) FOR [created_date]
GO
ALTER TABLE [dbo].[taskTbl] ADD  DEFAULT ('Pending') FOR [status]
GO
USE [master]
GO
ALTER DATABASE [task_mgmtDB] SET  READ_WRITE 
GO
