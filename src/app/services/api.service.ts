import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postVehicle(data : any){
    return this.http.post<any>("http://localhost:3000/vehicleList/", data);
  }

  getVehicles(){
    return this.http.get<any>("http://localhost:3000/vehicleList/");
  }

  putVehicle(data : any, id : number){
    return this.http.put<any>("http://localhost:3000/vehicleList/" + id, data)
  }

  deleteVehicle(id : number){
    return this.http.delete<any>("http://localhost:3000/vehicleList/" + id)
  }
}
