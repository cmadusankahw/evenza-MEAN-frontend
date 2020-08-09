import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { printCanvas } from 'src/app/modules/admin/admin.model';
import { ProductDetailsRequest } from '../../seller.model';
import { SellerService } from '../../seller.service';


@Component({
  selector: 'app-seller-product-details-report',
  templateUrl: './seller-product-details-report.component.html',
  styleUrls: ['./seller-product-details-report.component.scss']
})
export class SellerProductDetailsReportComponent implements OnInit {

  @Input() productDtails: ProductDetailsRequest;

  // recieved Service Provider ID
  @Input() public spId: string;

  // Charl URLS
  url1 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=cb52714f-973c-469b-9371-6dfaa737248e&autoRefresh=3000&theme=light";
  url2 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=75fc5f6d-7905-4ca1-a4d4-ff03ea49bcdc&autoRefresh=3000&theme=light";
  url3 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=d4db6977-a0fa-49d1-856a-f0e114d37978&autoRefresh=3000&theme=light";
  url4 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=7a1cc2f3-5074-4be6-b7b8-b7a2456d381d&autoRefresh=3000&theme=light";
  url5 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=01cd7ad8-90cf-41fb-bb72-8fca2f918384&autoRefresh=3000&theme=light";
  url6 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=5c285c10-b436-4464-9d5e-e0f5b8aed07b&autoRefresh=3000&theme=light";
  url7 = "https://charts.mongodb.com/charts-project-0-ywcjk/embed/charts?id=fee7bfe6-81bc-4e3e-8f5c-6406922ed5dc&autoRefresh=3000&theme=light";
  constructor(private sellerService: SellerService,
              public sanitizer: DomSanitizer) { }

  ngOnInit() {

  }

  public sellerFilter(url: string) {
    const queryString = '&filter={"seller.seller_id":"' + this.spId + '"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }

  public sellerUserFilter(url: string) {
    const queryString = '&filter={"user_id":"' + this.spId + '"}';
    return this.sanitizer.bypassSecurityTrustResourceUrl(url + queryString);
  }



  // print the report
  public printReport(content: string, title: string) {
    printCanvas(content, title);
  }

  // email report
  public emailReport(content: string) {

  }


}
