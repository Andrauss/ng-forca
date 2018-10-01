import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  lostGame = false;
  lostLetters = 0;

  palavra = '';
  posicoesDescobertas: Set<number> = new Set();
  gameStarded = false;
  venceuGame = false;

  getLostClass() {
    if (this.lostGame) {
      return {
        frame9: true
      };
    }
    const ret = {};
    ret[`frame${this.lostLetters + 1}`] = true;
    return ret;
  }

  posDescoberta(pos): boolean {
    return this.posicoesDescobertas.has(pos);
  }

  iniciarGame() {

    if (this.palavra.trim().length === 0) {
      alert('INFORME A PALAVRA');
      return;
    }

    this.gameStarded = true;
  }

  reIniciarGame() {
    this.gameStarded = false;
    this.venceuGame = false;
    this.lostGame = false;
    this.palavra = '';
    this.lostLetters = 0;
    this.posicoesDescobertas.clear();
  }

  tentarLetra(letra: string) {
    const palavraArray = this.palavra.split('');

    const quantidadeEspacos = palavraArray.filter((l) => l.trim().length === 0).length;

    const posicoes =
      palavraArray
        .map((letter: string, pos) => [letter, pos])
        .filter((arr) => arr[0].toString().toLowerCase() === letra.toLowerCase())
        .map((arr) => arr[1]);

    posicoes.forEach((pos: number) => this.posicoesDescobertas.add(pos));

    this.venceuGame = (this.posicoesDescobertas.size + quantidadeEspacos) === palavraArray.length;

    if (posicoes.length === 0) {
      this.lostLetters++;
      this.lostGame = this.lostLetters === 8;
    }

  }
}
