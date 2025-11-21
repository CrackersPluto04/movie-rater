type EditMoviePageProps = {
    onCancel: () => void;
}

export function EditMoviePage({ onCancel }: EditMoviePageProps) {
    return <>
        <div>Edit Movie Page</div>
        <button onClick={onCancel}>Cancel</button>
    </>
}