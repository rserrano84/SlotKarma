using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Slot.Karma.Web.API.Model {
  public class Response<T> {
    private String message = String.Empty;
    public String Message { get { return this.message; } set {this.message  = value; } }

    private T obj;
    public T Obj { get { return this.obj; } set { this.obj = value; } }

    private Int32 status = 200;
    public Int32 Status { get { return this.status; } set { this.status = value; } }

    private Int32 total = 0;
    public Int32 Total { get { return this.total; } set { this.total = value; } }


  }
}
