"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline_1 = require("readline");
var TicTacToe = /** @class */ (function () {
    function TicTacToe() {
        this.board = [
            ["_", "_", "_"],
            ["_", "_", "_"],
            ["_", "_", "_"]
        ];
        this.players = [];
        this.currentPlayerIndex = 0;
        this.lockedCell = null;
        this.lockedOwner = null;
        this.moves = 0;
        this.rl = readline_1.default.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    TicTacToe.prototype.ask = function (question) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.rl.question(question, function (answer) { return resolve(answer.trim()); });
                    })];
            });
        });
    };
    TicTacToe.prototype.displayBoard = function () {
        console.log("\n    1   2   3");
        console.log("  -------------");
        var rows = ["A", "B", "C"];
        this.board.forEach(function (row, i) {
            console.log("".concat(rows[i], " | ").concat(row.join(" | "), " |"));
            console.log("  -------------");
        });
    };
    TicTacToe.prototype.registerPlayers = function () {
        return __awaiter(this, void 0, void 0, function () {
            var i, name_1, symbol;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log("=== Player Registration ===");
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < 2)) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.ask("Enter Player ".concat(i + 1, " name: "))];
                    case 2:
                        name_1 = _a.sent();
                        symbol = void 0;
                        _a.label = 3;
                    case 3:
                        if (!true) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.ask("Enter ".concat(name_1, "'s symbol (not '_'): "))];
                    case 4:
                        symbol = _a.sent();
                        if (symbol === "_") {
                            console.log("❌ '_' is reserved. Choose another symbol.");
                        }
                        else if (this.players.length && this.players[0].symbol === symbol) {
                            console.log("❌ Symbol already taken. Choose another.");
                        }
                        else {
                            return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 3];
                    case 5:
                        this.players.push({ name: name_1, symbol: symbol });
                        _a.label = 6;
                    case 6:
                        i++;
                        return [3 /*break*/, 1];
                    case 7:
                        console.log("\nPlayers registered successfully!");
                        console.log("".concat(this.players[0].name, ": ").concat(this.players[0].symbol));
                        console.log("".concat(this.players[1].name, ": ").concat(this.players[1].symbol, "\n"));
                        return [2 /*return*/];
                }
            });
        });
    };
    TicTacToe.prototype.checkWin = function (symbol) {
        var b = this.board;
        var winPatterns = [
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
        return winPatterns.some(function (pattern) { return pattern.every(function (cell) { return cell === symbol; }); });
    };
    TicTacToe.prototype.checkDiagonalLock = function (symbol) {
        var b = this.board;
        var topLeft = b[0][0];
        var topRight = b[0][2];
        var center = b[1][1];
        var bottomLeft = b[2][0];
        var bottomRight = b[2][2];
        // Diagonal 1: A1 & C3
        if (topLeft === symbol && bottomRight === symbol && center === "_") {
            this.lockedCell = "B2";
            this.lockedOwner = symbol;
            console.log("\uD83D\uDD12 Center cell (B2) is now locked for ".concat(symbol, "!"));
        }
        // Diagonal 2: A3 & C1
        if (topRight === symbol && bottomLeft === symbol && center === "_") {
            this.lockedCell = "B2";
            this.lockedOwner = symbol;
            console.log("\uD83D\uDD12 Center cell (B2) is now locked for ".concat(symbol, "!"));
        }
    };
    TicTacToe.prototype.makeMove = function (player, input) {
        var validRows = { A: 0, B: 1, C: 2 };
        var validCols = { "1": 0, "2": 1, "3": 2 };
        if (input.length !== 2)
            return { error: "Invalid format. Use format like A1, B3 etc." };
        var row = validRows[input[0]];
        var col = validCols[input[1]];
        if (row === undefined || col === undefined)
            return { error: "Invalid coordinates!" };
        // Check lock
        if (this.lockedCell && this.lockedCell === input && this.lockedOwner !== player.symbol) {
            return { error: "Cell ".concat(this.lockedCell, " is locked for you!") };
        }
        if (this.board[row][col] !== "_")
            return { error: "Cell already taken!" };
        this.board[row][col] = player.symbol;
        this.checkDiagonalLock(player.symbol);
        return {};
    };
    TicTacToe.prototype.playTurn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var currentPlayer, move, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        currentPlayer = this.players[this.currentPlayerIndex];
                        return [4 /*yield*/, this.ask("".concat(currentPlayer.name, " (").concat(currentPlayer.symbol, "), enter your move (e.g. A1): "))];
                    case 1:
                        move = (_a.sent()).toUpperCase();
                        result = this.makeMove(currentPlayer, move);
                        if (result.error) {
                            console.log("❌ " + result.error);
                            return [2 /*return*/, this.playTurn()];
                        }
                        this.displayBoard();
                        this.moves++;
                        if (this.checkWin(currentPlayer.symbol)) {
                            console.log("\uD83C\uDFC6 ".concat(currentPlayer.name, " wins!"));
                            this.rl.close();
                            return [2 /*return*/];
                        }
                        if (this.moves === 9) {
                            console.log("🤝 It's a draw!");
                            this.rl.close();
                            return [2 /*return*/];
                        }
                        // Switch turn
                        this.currentPlayerIndex = 1 - this.currentPlayerIndex;
                        this.playTurn();
                        return [2 /*return*/];
                }
            });
        });
    };
    TicTacToe.prototype.startGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.registerPlayers()];
                    case 1:
                        _a.sent();
                        this.displayBoard();
                        return [4 /*yield*/, this.playTurn()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TicTacToe;
}());
var game = new TicTacToe();
game.startGame();
