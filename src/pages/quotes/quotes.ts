import { Component, OnInit } from '@angular/core';

import { NavParams, AlertController } from "ionic-angular"

import { Quote } from "../../data/quotes.interface"

import quotes from "../../data/quotes"

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {

quoteGroup: {category: string, quotes: Quote[], icon: string}

 constructor(private navParams : NavParams, private alertCrtl : AlertController){}

 ngOnInit(){
   this.quoteGroup = this.navParams.data;
 }

 onAddToFavorite(selectedQuote : Quote){
   const alert = this.alertCrtl.create({
     title: "Add Quote",
     message: "Are you sure you want to favorite this quote?",
     buttons: [
      {
       text: "Yes, go ahead",
       handler: () => {
         console.log('Ok')}
      },
      {
        text: "No, I change my mind",
        role: 'cancel',
        handler: () => {
          console.log("Cancelled")
        }
      }
   ]
   });

   alert.present();
 }
}
