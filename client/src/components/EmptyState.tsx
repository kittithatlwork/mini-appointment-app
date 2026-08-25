function EmptyState() {
    return (
        <div className="flex min-h-60 flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-700">
                No appointments
            </h2>

            <p className="mt-1 text-sm text-gray-500">
                There are no appointments scheduled yet.
            </p>
        </div>
    );
}

export default EmptyState;