import { Component, OnInit } from '@angular/core';
import { NavParams, AlertController } from "ionic-angular"
import { Quote } from "../../data/quotes.interface"
import { QuotesService } from "../../services/quotes"
import quotes from "../../data/quotes"

@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {

quoteGroup: {category: string, quotes: Quote[], icon: string}

 constructor(private navParams : NavParams, private alertCrtl : AlertController, private quotesService : QuotesService){}

 ngOnInit(){
   this.quoteGroup = this.navParams.data;
 }

 onAddToFavorites(selectedQuote : Quote){
   const alert = this.alertCrtl.create({
     title: "Add Quote",
     message: "Are you sure you want to favorite this quote?",
     buttons: [
      {
       text: "Yes, go ahead",
       handler: () => {
         this.quotesService.addQuoteToFavorite(selectedQuote);
       }
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

 onRemoveFromFavorites(quote: Quote){
   this.quotesService.removeQuoteFromFavorites(quote)
 }

 isFavorite(quote : Quote){
   return this.quotesService.isQuoteFavorite(quote)
 }
}
