USE [employeeDB]
GO

/****** Object:  Table [dbo].[employees]    Script Date: 2024-06-12 14:11:31 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[employees](
	[id] [bigint] IDENTITY(1,1) NOT NULL,
	[first_name] [nvarchar](50) NULL,
	[last_name] [nvarchar](50) NULL,
	[email] [nvarchar](50) NULL,
	[comments] [nvarchar](MAX) NULL,
	[is_friendly] [bit] NULL,
	[birth_year] [int] NULL,
	[weight] [decimal](18, 4) NULL,
	[employment_status] [int] NULL,
	[favorite_color] [int] NULL
) ON [PRIMARY]
GO


