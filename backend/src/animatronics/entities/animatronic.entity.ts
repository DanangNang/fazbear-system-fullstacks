export class Animatronic {
    id: number;
    name: string;
    form: string;
    seriesGame: string;
    threatLevel: number;
    isPossessed: boolean;
    status?: string; // 'Possessed' | 'Normal' | 'Pasif'
    behaviorNote?: string;
    imageUrl?: string;
    loggedAt: string;
}