export class Geo { 
  public static latitude: number = 0.0;
  public static longitude: number = 0.0;
  public static location() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position: Position) => {
          Geo.latitude = position.coords.latitude;
          Geo.longitude = position.coords.longitude;
        });
      }
    }
}