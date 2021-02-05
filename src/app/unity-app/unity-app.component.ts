import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var UnityLoader: any;

@Component({
  selector: 'unity-app',
  templateUrl: './unity-app.component.html',
  styleUrls: ['./unity-app.component.css']
})
export class UnityAppComponent implements OnInit, AfterViewInit {
  @Input() appName: string;
  unityInstance: any;

  constructor(private route: ActivatedRoute)
  {
    // this.route.data.subscribe((data) =>
    // {
    //   this.appName = data.appName;
    // });
  }

  public loadScript(url: string)
  {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    script.onload = () =>
    {
      this.unityInstance = UnityLoader.instantiate("unityContainer", `assets/${this.appName}/${this.appName}.json`);
    };

    body.appendChild(script);
  }

  ngOnInit(): void
  {
  }

  ngAfterViewInit(): void
  {
    this.loadScript(`../../assets/${this.appName}/UnityLoader.js`);
  }

}
