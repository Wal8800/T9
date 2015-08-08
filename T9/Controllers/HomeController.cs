using Newtonsoft.Json;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using T9.Models;

namespace T9.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //http://api.eventfinda.co.nz/v2/events.json?row=10&fields=event:(url,name,point,address,images,restrictions)&location=2&order=popularity
            var client = new RestClient("http://api.eventfinda.co.nz/v2");
            client.Authenticator = new HttpBasicAuthenticator("eventmanger", "25td4xdfq496");

            var request = new RestRequest("events.json", Method.GET);
            request.AddParameter("row", "10"); // adds to POST or URL querystring based on Method
            request.AddParameter("fields", "event:(url,name,point,address,images,restrictions)");
            request.AddParameter("location", "2");
            request.AddParameter("order", "popularity");
            //request.AddUrlSegment("id", "123"); // replaces matching token in request.Resource

            // easily add HTTP Headers
            request.AddHeader("header", "value");

            // add files to upload (works with compatible verbs)
           // request.AddFile(path);

            // execute the request
            var response = client.Execute(request);
            var content = response.Content; // raw content as string

            EventList list = JsonConvert.DeserializeObject<EventList>(content);
            // or automatically deserialize result
            // return content type is sniffed but can be explicitly set via RestClient.AddHandler();
            //RestResponse<Person> response2 = client.Execute<Person>(request);
            //var name = response2.Data.Name;

            // easy async support



            //  async with deserialization
            // var asyncHandle = client.ExecuteAsync<Person>(request, response => {
            //  Console.WriteLine(response.Data.Name);
            //});

            // abort the request on demand
            //asyncHandle.Abort();


            return View();
        }
    }
}
