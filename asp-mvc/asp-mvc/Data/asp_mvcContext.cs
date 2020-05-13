using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MvcMovie.Models;

namespace asp_mvc.Data
{
    public class asp_mvcContext : DbContext
    {
        public asp_mvcContext (DbContextOptions<asp_mvcContext> options)
            : base(options)
        {
        }

        public DbSet<MvcMovie.Models.Movie> Movie { get; set; }
    }
}
