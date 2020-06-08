using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using System.Collections.Generic;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;
using System;

namespace Slot.Karma.Web.API
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services) {
      services.AddResponseCaching();
      services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).
        AddCookie(CookieAuthenticationDefaults.AuthenticationScheme,
                options => {
                  options.ReturnUrlParameter = "";
                  options.LoginPath = "/";
                  options.LogoutPath = "/";
                  options.Events.OnRedirectToLogin = ctx => {
                    if (ctx.Request.Path.StartsWithSegments("/api") &&
                        ctx.Response.StatusCode == (int)HttpStatusCode.OK) {
                      ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                    }
                    else {
                      ctx.Response.Redirect(ctx.RedirectUri);
                    }
                    return Task.FromResult(0);
                  };
                });

      services.AddMvc();
      services.AddResponseCompression(options =>
      {
        options.EnableForHttps = true;
        options.Providers.Add<GzipCompressionProvider>();
      });
      services.AddControllers().AddNewtonsoftJson(options => {
        options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
        options.SerializerSettings.Formatting = Newtonsoft.Json.Formatting.None;
        options.SerializerSettings.Converters = new List<Newtonsoft.Json.JsonConverter>() {
          new Newtonsoft.Json.Converters.IsoDateTimeConverter()
        };
      });

      // authentication 
      /*services.AddAuthentication(options =>
      {
        options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
      });*/

      services.AddTransient(
        m => {
          return
            // Configuration.GetValue<string>(Configuration.GetConnectionString("DefaultConnection"))
            new Slot.Karma.Web.API.Model.AuthenticationManager(string.Empty);
        }
      );
      services.AddDistributedMemoryCache();

      services.AddControllersWithViews().AddJsonOptions(opts => opts.JsonSerializerOptions.PropertyNamingPolicy = null); ;
      // In production, the Angular files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "ClientApp/dist/slotkarma";
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseAuthentication();
      if (!env.IsDevelopment())
      {
        app.UseSpaStaticFiles();
      }

      app.UseRouting();
      app.UseAuthorization();
      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "api/{controller}/{action=Index}/{id?}");
      });

      app.UseResponseCaching();
      app.UseSpa(spa =>
      {
              // To learn more about options for serving an Angular SPA from ASP.NET Core,
              // see https://go.microsoft.com/fwlink/?linkid=864501

              spa.Options.SourcePath = "ClientApp";
        spa.Options.DefaultPageStaticFileOptions = new StaticFileOptions() {
          OnPrepareResponse = context => {
            if (context.File.Name == "index.html") {
              context.Context.Response.Headers.Add("Cache-Control", "max-age=31536000");
              context.Context.Response.Headers.Add("Expires", "31536000");
            }
            context.Context.Response.Headers[Microsoft.Net.Http.Headers.HeaderNames.Vary] =
              new string[] { "Accept-Encoding" };
          }
        };

        if (env.IsDevelopment())
        {
          spa.UseAngularCliServer(npmScript: "start");
        }
      });
      app.UseResponseCompression();

    }
  }
}
