import {create} from "zustand"

export const useBookStore = create((set) => ({
    books: [],
    setBooks: (books) => set({books}),
    createBook: async (newBook) => {
        if (!newBook.title || !newBook.author){
            return {message: "Provide all fields"}
        }
        console.log("sent book...")
        const res = await fetch("http://localhost:5000/books", {
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify(newBook)
        })
        console.log("book added...")

        const data = await res.json();
        set((state) => ({books: [...state.books, data.data]}))
    },
    fetchBooks: async () => {
        const res = await fetch("http://localhost:5000/books");
        const data = await res.json();
        set({books: data.data})
    },
    deleteBook: async (bid) => {
        const res = await fetch(`http://localhost:5000/books/${bid}`, {
            method: "DELETE",
        });
        const data = await res.json()

        set(state => ({books: state.books.filter(book => book._id != bid)}))
    },
    updateBook: async (bid, updatedBook) => {
        const res = await fetch(`http://localhost:5000/books/${bid}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook)
        });
        const data = await res.json()

        set(state => ({books: state.books.map(book => book._id === bid ? data.data : book)}))
    },

}))