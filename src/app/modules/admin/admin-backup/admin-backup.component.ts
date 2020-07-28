import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-backup',
  templateUrl: './admin-backup.component.html',
  styleUrls: ['./admin-backup.component.scss']
})
export class AdminBackupComponent implements OnInit {

  constructor(private adminService: AdminService) { }

  ngOnInit() {

  }

  createBackup(path: string){
    console.log(path);
    this.adminService.createBackup(path);
  }

  restoreBackup(path: string) {
    console.log(path);
    this.adminService.restoreBackup(path);
  }

}
