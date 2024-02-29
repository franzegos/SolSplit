interface TDeck {
	suit: string
	value: number
	key: string
}

class Deck {
	private deck: Array<TDeck> = []
	private readonly suits = ['spades', 'diamonds', 'clubs', 'hearts']
	private readonly nums = {
		Ace: 1,
		Two: 2,
		Three: 3,
		Four: 4,
		Five: 5,
		Six: 6,
		Seven: 7,
		Eight: 8,
		Nine: 9,
		Ten: 10,
		Jack: 11,
		Queen: 12,
		King: 13
	}

	constructor() {
		this.deck = this.initialize()
		this.shuffle()
	}

	private initialize() {
		const deck = []
		for (let i = 0; i < this.suits.length; i++) {
			for (const [key, value] of Object.entries(this.nums)) {
				deck.push({
					suit: this.suits[i],
					key,
					value
				})
			}
		}

		return deck
	}

	reset() {
		const deck = this.initialize()
		this.deck = deck
		this.shuffle()
		return this.show()
	}

	remaining() {
		return this.deck.length
	}

	// NOTE: This should be a private method
	show() {
		return {
			deck: this.deck,
			remaining: this.remaining()
		}
	}

	// NOTE:
	// REF: https://bost.ocks.org/mike/shuffle/
	shuffle() {
		let deckLength = this.remaining()
		let t: TDeck
		let i: number

		// While there remain elements to shuffle…
		while (deckLength) {
			// Pick a remaining element…
			i = Math.floor(Math.random() * deckLength--)

			// And swap it with the current element.
			t = this.deck[deckLength]
			this.deck[deckLength] = this.deck[i]
			this.deck[i] = t
		}

		return this.show()
	}

	draw(count?: number) {
		const c = count ?? 1
		const card = this.deck.splice(-c)
		return card
	}
}

const deck = new Deck()
console.log(deck.show())
console.log(deck.draw(2))
console.log(deck.show())

export default Deck
