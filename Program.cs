using Microsoft.EntityFrameworkCore;
using Seguros.WebApp;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();


builder.Services.AddDbContext<SegurosContext>(options =>  {

    var connectionString = builder.Configuration["MongoDbSettings:ConnectionString"];
    var dataBaseName = builder.Configuration["MongoDbSettings:DatabaseName"];

    if (string.IsNullOrEmpty(connectionString) || string.IsNullOrEmpty(dataBaseName)) 
        throw new Exception("MongoDbSettings não foi definido no arquivo de config. ou user secrets");
    
    options.UseMongoDB(connectionString, dataBaseName);
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
