import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/auth.service';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { Router, NavigationEnd } from '@angular/router';

import { EventPlanner } from '../eventplanner.model';
import { ErrorComponent } from 'src/app/error/error.component';
import { EventPlannerService } from '../eventplanner.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-planner-profile',
  templateUrl: './planner-profile.component.html',
  styleUrls: ['./planner-profile.component.scss']
})
export class PlannerProfileComponent implements OnInit, OnDestroy {


  private eventPlannerSub: Subscription;

  // enabling ctomization only if it is the owner
  @Input() isowner: boolean;

  // image to upload
  image: File;
  imageUrl: any = './assets/images/merchant/nopic.png';

  // edit profile mode
  editmode = false;

  // recieved event planner
  eventPlanner: EventPlanner;

  constructor(private authService: AuthService,
              public dialog: MatDialog,
              private eventPlannerService: EventPlannerService,
              public datepipe: DatePipe,
              private router: Router) { }

  ngOnInit() {
    this.authService.getEventPlanner();
    this.eventPlannerSub = this.authService.getEventPlannerUpdateListener().subscribe(
      planner => {
        this.eventPlanner = planner;
      });

  }

  ngOnDestroy() {
    if (this.eventPlannerSub) {
      this.eventPlannerSub.unsubscribe();
    }
    this.imageUrl = './assets/images/merchant/nopic.png';
    this.image = null;
  }

  changeUserPassword(pwordForm: NgForm) {
    if (pwordForm.invalid) {
      console.log('Form invalid');
    }
    if (pwordForm.value.new_password1 !== pwordForm.value.new_password2) {
      this.dialog.open(ErrorComponent, { data: { message: 'Passwords do not match! Please try again!' } });
    }
    // this.serviceProviderService.changeUserPassword(currentPword, newPword);
  }

  // edit user
  editUser(editForm: NgForm) {
    if (editForm.invalid) {
      console.log('Form Invalid');
    } else {
      const planner: EventPlanner = {
        user_id: this.eventPlanner.user_id,
        first_name: editForm.value.first_name,
        last_name: editForm.value.last_name,
        profile_pic: this.eventPlanner.profile_pic,
        email: editForm.value.email,
        contact_no: editForm.value.contact_no,
        address_line1: editForm.value.address_line1,
        address_line2: editForm.value.address_line2,
        postal_code: editForm.value.postal_code,
        gender: editForm.value.gender,
        date_of_birth: editForm.value.date_of_birth,
        reg_date: this.eventPlanner.reg_date,
      };
      console.log(planner);
      this.authService.updateEventPlanner(planner, this.image);
      this.eventPlannerSub = this.authService.getEventPlannerUpdateListener()
        .subscribe((recievedPlanner: EventPlanner) => {
          console.log(recievedPlanner);
          this.eventPlanner = recievedPlanner;
        });
      console.log('Event Planner updated successfully!');
      editForm.resetForm();
      this.editmode = false;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate(['/planner/profile']);
    }
  }

  // profile pic uploading
  onImageUploaded(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.image = file;
      this.imageUrl = reader.result;
    };
  }

}
