using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace T9.Models
{
    public class Image
    {
        public int Id { get; set; }
        public bool Is_Primary { get; set; }
        public Transforms transforms { get; set; }
    }
}