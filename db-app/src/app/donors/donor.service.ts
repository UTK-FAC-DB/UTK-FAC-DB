import { Injectable } from '@angular/core';
import { Donor } from './donor';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
  private donorsUrl = '/api/donors';
  private donorsUpdated = new Subject<Donor[]>();
  private donors: Donor[] = [];

  constructor(private http: HttpClient) {}

  // get("/api/donors")
  getDonors() {
    this.http.get<{donors: any}>(this.donorsUrl)
      .pipe(map((donorData) => {
        return donorData.donors.map(donor => {
          return {
            firstName: donor.firstName
          };
        });
      }))
      .subscribe(transformedDonors => {
        this.donors = transformedDonors;
        this.donorsUpdated.next([...this.donors]);
      });
  }

  getDonorUpdateListener() {
    return this.donorsUpdated.asObservable();
  }

  // post("/api/donors")
  createDonor(newDonor: Donor): Promise<void | Donor> {
    return this.http.post(this.donorsUrl, newDonor)
      .toPromise()
      .then((response) => response as Donor)
      .catch(this.handleError);
  } 

  // get("/api/donors/:id")

  // delete("/api/donors/:id")
  deleteDonor(delDonorId: String): Promise<void | String> {
    return this.http.delete(this.donorsUrl + '/' + delDonorId)
      .toPromise()
      .then(response => response as String)
      .catch(this.handleError);
  }

  // put("/api/donors/:id")
  updateDonor(putDonor: Donor): Promise<void | Donor> {
    var putUrl = this.donorsUrl + '/' + putDonor._id;
    return this.http.put(putUrl, putDonor)
      .toPromise()
      .then(response => response as Donor)
      .catch(this.handleError);
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
  }
}
