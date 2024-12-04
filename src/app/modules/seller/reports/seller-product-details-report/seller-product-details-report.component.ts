import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { printCanvas } from 'src/app/modules/admin/admin.model';
import { ProductDetailsRequest } from '../../seller.model';
import { SellerService } from '../../seller.service';
import { AdminService } from 'src/app/modules/admin/admin.service';


@Component({
  selector: 'app-seller-product-details-report',
  templateUrl: './seller-product-details-report.component.html',
  styleUrls: ['./seller-product-details-report.component.scss']
})
export class SellerProductDetailsReportComponent implements OnInit {

  @Input() productDtails: ProductDetailsRequest;

  // recieved Service Provider ID
  @Input() public spId: string;

  // report URL for emailing
  public reportUrl: string;

  // Charl URLS
  url1: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=cb52714f-973c-469b-9371-6dfaa737248e&autoRefresh=3000&theme=light";
  url2: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=75fc5f6d-7905-4ca1-a4d4-ff03ea49bcdc&autoRefresh=3000&theme=light";
  url3: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=d4db6977-a0fa-49d1-856a-f0e114d37978&autoRefresh=3000&theme=light";
  url4: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=7a1cc2f3-5074-4be6-b7b8-b7a2456d381d&autoRefresh=3000&theme=light";
  url5: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=01cd7ad8-90cf-41fb-bb72-8fca2f918384&autoRefresh=3000&theme=light";
  url6: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=5c285c10-b436-4464-9d5e-e0f5b8aed07b&autoRefresh=3000&theme=light";
  url7: any = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=fee7bfe6-81bc-4e3e-8f5c-6406922ed5dc&autoRefresh=3000&theme=light";

  constructor(private sellerService: SellerService,
              public sanitizer: DomSanitizer,
              private adminService: AdminService) { }

  ngOnInit() {

    this.url1 = this.sellerUserFilter(this.url1);
    this.url2 = this.sellerFilter(this.url2);
    this.url3 = this.sellerUserFilter(this.url3);
    this.url4 = this.sellerUserFilter(this.url4);
    this.url5 = this.sellerFilter(this.url5);
    this.url6 = this.sellerUserFilter(this.url6);
    this.url7 = this.sellerUserFilter(this.url7);


  }

  // applying report filters
  public sellerFilter(url: string) {
    const queryString = '&filter={"seller.seller_id":"' + this.spId + '"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }

  // apppliying report filters
  public sellerUserFilter(url: string) {
    const queryString = '&filter={"user_id":"' + this.spId + '"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }



  // print the report
  public printReport(content: string, title: string) {
    this.reportUrl = printCanvas(content, title);
  }

  // email report
  public emailReport(attachment: string, title: string) {
    this.adminService.emailReport(attachment, title);
  }


}
