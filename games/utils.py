import random

# Card values for Blackjack
CARD_VALUES = {
    '2': 2, '3': 3, '4': 4, '5': 5, '6': 6,
    '7': 7, '8': 8, '9': 9, '10': 10,
    'J': 10, 'Q': 10, 'K': 10, 'A': 11
}

def create_deck():
    suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
    ranks = list(CARD_VALUES.keys())
    deck = [(rank, suit) for suit in suits for rank in ranks]
    random.shuffle(deck)
    return deck

def calculate_hand_value(hand):
    value = 0
    aces = 0

    for card in hand:
        rank = card[0]
        value += CARD_VALUES[rank]
        if rank == 'A':
            aces += 1

    while value > 21 and aces:
        value -= 10
        aces -= 1

    return value

def dealer_should_hit(dealer_hand):
    return calculate_hand_value(dealer_hand) < 17


def card_image_filename(card):
    """
    Converts a card tuple into the corresponding image file name.

    Examples:
    ('A', 'Spades') -> 'ace_of_spades.png'
    ('10', 'Hearts') -> '10_of_hearts.png'
    """
    rank, suit = card
    # Normalize rank names for face cards and ace
    rank_map = {
        'J': 'jack',
        'Q': 'queen',
        'K': 'king',
        'A': 'ace'
    }

    # Get mapped name or use the number directly (e.g., '2', '10')
    rank_str = rank_map.get(rank, rank).lower()
    suit_str = suit.lower()
    return f"games/{rank_str}_of_{suit_str}.png"