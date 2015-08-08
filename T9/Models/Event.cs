using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace T9.Models
{
    public class Event
    {
        public string Url { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Restrictions { get; set; }
        public string Description { get; set; }
        public Point  Point { get; set; }
        public Images Images { get; set; }

    }
}