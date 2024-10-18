import { useState, useEffect } from 'react';

// This is a simple list of common words. In a real application, this would be much more extensive.
const commonWords = [
    'react', 'javascript', 'typescript', 'python', 'java', 'c++', 'html', 'css',
    'node', 'express', 'mongodb', 'sql', 'database', 'frontend', 'backend',
    'fullstack', 'development', 'programming', 'coding', 'software', 'web',
    'app', 'mobile', 'design', 'ui', 'ux', 'framework', 'library', 'api',
    'server', 'client', 'cloud', 'devops', 'agile', 'scrum', 'git', 'github',
    'docker', 'kubernetes', 'aws', 'azure', 'google', 'machine', 'learning',
    'artificial', 'intelligence', 'data', 'science', 'analytics', 'blockchain',
    'cybersecurity', 'networking', 'operating', 'system', 'algorithm', 'structure', 'dsa'
];

function levenshteinDistance(a: string, b: string): number {
    const matrix = [];

    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1,
                    matrix[i][j - 1] + 1,
                    matrix[i - 1][j] + 1
                );
            }
        }
    }

    return matrix[b.length][a.length];
}

function findClosestWord(word: string): string | null {
    let closestWord = null;
    let minDistance = Infinity;

    for (const commonWord of commonWords) {
        const distance = levenshteinDistance(word.toLowerCase(), commonWord);
        if (distance < minDistance && distance <= 2) {  // Allow up to 2 edits
            minDistance = distance;
            closestWord = commonWord;
        }
    }

    return closestWord;
}

export function useAutocorrect(query: string) {
    const [correctedQuery, setCorrectedQuery] = useState(query);
    const [isCorrected, setIsCorrected] = useState(false);

    useEffect(() => {
        const words = query.split(' ');
        const correctedWords = words.map(word => findClosestWord(word) || word);
        const newCorrectedQuery = correctedWords.join(' ');

        if (newCorrectedQuery !== query) {
            setCorrectedQuery(newCorrectedQuery);
            setIsCorrected(true);
        } else {
            setCorrectedQuery(query);
            setIsCorrected(false);
        }
    }, [query]);

    return { correctedQuery, isCorrected };
}