import readline from "readline";

interface Player {
  name: string;
  symbol: string;
}

class TicTacToe {
  private board: string[][] = [
    ["_", "_", "_"],
    ["_", "_", "_"],
    ["_", "_", "_"]
  ];
  private players: Player[] = [];
  private currentPlayerIndex = 0;
  private lockedCell: string | null = null;
  private lockedOwner: string | null = null;
  private moves = 0;

  private rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  private async ask(question: string): Promise<string> {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => resolve(answer.trim()));
    });
  }

  private displayBoard(): void {
    console.log("\n    1   2   3");
    console.log("  -------------");
    const rows = ["A", "B", "C"];
    this.board.forEach((row, i) => {
      console.log(`${rows[i]} | ${row.join(" | ")} |`);
      console.log("  -------------");
    });
  }

  private async registerPlayers(): Promise<void> {
    console.log("=== Player Registration ===");
    for (let i = 0; i < 2; i++) {
      const name = await this.ask(`Enter Player ${i + 1} name: `);

      let symbol: string;
      while (true) {
        symbol = await this.ask(`Enter ${name}'s symbol (not '_'): `);
        if (symbol === "_") {
          console.log("❌ '_' is reserved. Choose another symbol.");
        } else if (this.players.length && this.players[0].symbol === symbol) {
          console.log("❌ Symbol already taken. Choose another.");
        } else {
          break;
        }
      }

      this.players.push({ name, symbol });
    }

    console.log("\nPlayers registered successfully!");
    console.log(`${this.players[0].name}: ${this.players[0].symbol}`);
    console.log(`${this.players[1].name}: ${this.players[1].symbol}\n`);
  }

  private checkWin(symbol: string): boolean {
    const b = this.board;

    const winPatterns: string[][] = [
      // Rows
      [b[0][0], b[0][1], b[0][2]],
      [b[1][0], b[1][1], b[1][2]],
      [b[2][0], b[2][1], b[2][2]],
      // Columns
      [b[0][0], b[1][0], b[2][0]],
      [b[0][1], b[1][1], b[2][1]],
      [b[0][2], b[1][2], b[2][2]],
      // Diagonals
      [b[0][0], b[1][1], b[2][2]],
      [b[0][2], b[1][1], b[2][0]]
    ];

    return winPatterns.some((pattern) => pattern.every((cell) => cell === symbol));
  }

  private checkDiagonalLock(symbol: string): void {
    const b = this.board;
    const topLeft = b[0][0];
    const topRight = b[0][2];
    const center = b[1][1];
    const bottomLeft = b[2][0];
    const bottomRight = b[2][2];

    // Diagonal 1: A1 & C3
    if (topLeft === symbol && bottomRight === symbol && center === "_") {
      this.lockedCell = "B2";
      this.lockedOwner = symbol;
      console.log(`🔒 Center cell (B2) is now locked for ${symbol}!`);
    }

    // Diagonal 2: A3 & C1
    if (topRight === symbol && bottomLeft === symbol && center === "_") {
      this.lockedCell = "B2";
      this.lockedOwner = symbol;
      console.log(`🔒 Center cell (B2) is now locked for ${symbol}!`);
    }
  }

  private makeMove(player: Player, input: string): { error?: string } {
    const validRows: Record<string, number> = { A: 0, B: 1, C: 2 };
    const validCols: Record<string, number> = { "1": 0, "2": 1, "3": 2 };

    if (input.length !== 2) return { error: "Invalid format. Use format like A1, B3 etc." };

    const row = validRows[input[0]];
    const col = validCols[input[1]];

    if (row === undefined || col === undefined) return { error: "Invalid coordinates!" };

    // Check lock
    if (this.lockedCell && this.lockedCell === input && this.lockedOwner !== player.symbol) {
      return { error: `Cell ${this.lockedCell} is locked for you!` };
    }

    if (this.board[row][col] !== "_") return { error: "Cell already taken!" };

    this.board[row][col] = player.symbol;
    this.checkDiagonalLock(player.symbol);
    return {};
  }

  private async playTurn(): Promise<void> {
    const currentPlayer = this.players[this.currentPlayerIndex];
    const move = (await this.ask(`${currentPlayer.name} (${currentPlayer.symbol}), enter your move (e.g. A1): `)).toUpperCase();

    const result = this.makeMove(currentPlayer, move);
    if (result.error) {
      console.log("❌ " + result.error);
      return this.playTurn();
    }

    this.displayBoard();
    this.moves++;

    if (this.checkWin(currentPlayer.symbol)) {
      console.log(`🏆 ${currentPlayer.name} wins!`);
      this.rl.close();
      return;
    }

    if (this.moves === 9) {
      console.log("🤝 It's a draw!");
      this.rl.close();
      return;
    }

    // Switch turn
    this.currentPlayerIndex = 1 - this.currentPlayerIndex;
    this.playTurn();
  }

  public async startGame(): Promise<void> {
    await this.registerPlayers();
    this.displayBoard();
    await this.playTurn();
  }
}

const game = new TicTacToe();
game.startGame();