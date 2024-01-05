export default function Header() {
    return (
        <header className="flex flex-col items-center justify-center space-y-4 my-10">
            <img src="/game-logo.png" alt="Game Logo" className="h-16 w-16 md:h-24 md:w-24" />
            <h1 className="text-4xl text-earth font-cursive">Tic-Tac-Toe</h1>
        </header>
    );
}
