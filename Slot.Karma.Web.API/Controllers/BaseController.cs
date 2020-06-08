using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Slot.Karma.Web.API.Controllers
{
    public class BaseController : ControllerBase
    {
        protected Slot.Karma.API.UnitOfWork.UnitOfWork uow = new Slot.Karma.API.UnitOfWork.UnitOfWork("server=slotkarma-database-8-0-16.c2giymxpafww.us-east-2.rds.amazonaws.com;port=3306;user=admin;password=skfoobar1234;database=slotkarma;AllowZeroDateTime=True");
        protected Newtonsoft.Json.JsonSerializerSettings JsonSettings = new Newtonsoft.Json.JsonSerializerSettings()
        {
            ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore,
            Formatting = Newtonsoft.Json.Formatting.None,
            Converters = { new Newtonsoft.Json.Converters.IsoDateTimeConverter() }
        };
    }
}
