import { Component } from '@angular/core';
import { Quote } from "../../data/quotes.interface";
import { QuotesService } from '../../services/quotes';
import { ModalController} from "ionic-angular";
import { QuotePage } from "../quote/quote";
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})
export class FavoritesPage {
  quotes: Quote[];

  constructor(private quotesService : QuotesService, private modalCtrl : ModalController, private settingsService: SettingsService) {}

  ionViewWillEnter(){
    this.quotes = this.quotesService.getFavoriteQuotes();
  }

  onViewQuote(quote : Quote ){
    const modal = this.modalCtrl.create(QuotePage, quote);
    modal.present()
    modal.onDidDismiss((remove : boolean) => {
      if (remove){
        this.quotesService.removeQuoteFromFavorites(quote)
        this.quotes = this.quotesService.getFavoriteQuotes()
      }
    })
  }

  onRemoveFromFavorites(quote: Quote){
    this.quotesService.removeQuoteFromFavorites(quote);
    this.quotes = this.quotesService.getFavoriteQuotes()
    //Another way to do it
    // const position = this.quotes.findIndex((quoteEl : Quote) => {
    //   return quoteEl.id == quote.id;
    // });
    // this.quotes.splice(position, 1)
  }

  getBackground(){
    return this.settingsService.isAltBackground() ? 'altQuoteBackground' : 'quoteBackground';
  }
}
