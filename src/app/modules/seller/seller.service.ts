import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class SellerService {


  url = 'http://localhost:3000/api/';


  constructor(private http: HttpClient,
              private router: Router, ) {}


}
