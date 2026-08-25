interface HeaderProps {
    onCreate: () => void;
}

function Header ({ onCreate }: HeaderProps) {
    return (
        <header className=" bg-blue-500 flex items-center justify-between px-8 py-5">
            <h1 className="text-2xl font-semibold tracking-tight text-white">Appointment</h1>
            <button className="rounded-lg bg-white px-4 py-2 font-medium text-blue-600 shadow-sm transition hover:bg-blue-50" onClick={ onCreate }>
                + New Appointment
            </button>
        </header>
    )
}

export default Header;