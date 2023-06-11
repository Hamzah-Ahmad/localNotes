type Note = {
    id: string;
    text?: string;
    code?: string;
}

type Notes = Note[];

type Mode = 'Text' | 'Code'