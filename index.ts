// Classe Arma
class Arma {
    constructor(private readonly nome: string, private dano: number, private readonly descricao: string) {}

    getNome(): string {
        return this.nome;
    }

    getDescricao(): string {
        return this.descricao;
    }

    getDano(): number {
        return this.dano;
    }

    setDano(dano: number): void {
        if (dano >= 0) {
            this.dano = dano;
        }
    }
}

// Classe Personagem
class Personagem {
    private arma: Arma | null = null;

    constructor(private nome: string, private vida: number, private forca: number) {}

    getNome(): string {
        return this.nome;
    }

    setNome(nome: string): void {
        this.nome = nome;
    }

    getVida(): number {
        return this.vida;
    }

    setVida(vida: number): void {
        this.vida = vida;
    }

    getForca(): number {
        return this.forca;
    }

    setForca(forca: number): void {
        this.forca = forca;
    }

    getArma(): Arma | null {
        return this.arma;
    }

    setArma(arma: Arma | null): void {
        this.arma = arma;
    }

    atacar(alvo: Personagem): void {
        if (Math.random() > 0.5) {
            const dano = this.calcularDano();
            alvo.receberDano(dano);
            console.log(`${this.nome} atacou ${alvo.getNome()} causando ${dano} de dano!`);
        } else {
            console.log(`${this.nome} errou o ataque!`);
        }
    }

    receberDano(dano: number): void {
        this.vida -= dano;
        if (this.vida <= 0) {
            console.log(`${this.nome} foi derrotado!`);
        }
    }

    equiparArma(arma: Arma): void {
        this.arma = arma;
    }

    private calcularDano(): number {
        return this.forca + (this.arma ? this.arma.getDano() : 0);
    }
}

// Classe Inimigo
class Inimigo extends Personagem {
    atacar(alvo: Personagem): void {
        if (Math.random() > 0.2) {
            const dano = this.getForca() + (this.getArma() ? this.getArma()!.getDano() : 0);
            alvo.receberDano(dano);
            console.log(`${this.getNome()} atacou ${alvo.getNome()} causando ${dano} de dano!`);
        } else {
            console.log(`${this.getNome()} errou o ataque!`);
        }
    }

    comportamentoAleatorio(jogador: Personagem): void {
        if (Math.random() > 0.5) {
            this.atacar(jogador);
        } else {
            console.log(`${this.getNome()} observou o jogador.`);
        }
    }
}

// Classe Chefe
class Chefe extends Inimigo {
    atacar(alvo: Personagem): void {
        if (Math.random() > 0.2) {
            const dano = (this.getForca() + (this.getArma() ? this.getArma()!.getDano() : 0)) * 2;
            alvo.receberDano(dano);
            console.log(`⚔️ ${this.getNome()} atacou com força total e causou ${dano} de dano!`);
        } else {
            console.log(`⚔️ ${this.getNome()} errou o ataque!`);
        }
    }

    receberDano(dano: number): void {
        super.receberDano(dano);
        if (this.getVida() <= 0 && Math.random() <= 0.2) {
            console.log(`🔥 ${this.getNome()} tenta uma última ação antes de ser derrotado!`);
            this.comportamentoAleatorio(new Personagem("Jogador", 100, 20));
        }
    }
}

// Instanciando armas
const espada = new Arma("Espada Longa", 15, "Uma espada afiada feita de aço");
const machado = new Arma("Machado de Guerra", 20, "Um machado pesado e destrutivo");
const arco = new Arma("Arco Longo", 12, "Um arco de madeira com grande precisão");

// Criando personagens
const jogador = new Personagem("Herói", 100, 25);
const inimigo1 = new Inimigo("Goblin", 50, 10);
const inimigo2 = new Inimigo("Orc", 70, 15);
const inimigo3 = new Inimigo("Esqueleto", 60, 12);
const inimigo4 = new Inimigo("Bandido", 55, 14);
const inimigo5 = new Inimigo("Lobo Selvagem", 40, 18);
const chefe = new Chefe("Dragão Ancião", 200, 30);

// Equipando armas
jogador.equiparArma(espada);
inimigo1.equiparArma(machado);
chefe.equiparArma(arco);

// Simulação de combate
jogador.atacar(inimigo1);
inimigo1.atacar(jogador);
chefe.atacar(jogador);
