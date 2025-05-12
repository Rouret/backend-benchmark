export const logger = {
    info: (message: string) => console.log(`\x1b[36m[INFO]\x1b[0m ${new Date().toISOString()} - ${message}`),
    success: (message: string) => console.log(`\x1b[32m[SUCCÈS]\x1b[0m ${new Date().toISOString()} - ${message}`),
    error: (message: string, error?: any) => console.error(`\x1b[31m[ERREUR]\x1b[0m ${new Date().toISOString()} - ${message}`, error || ''),
    warn: (message: string) => console.log(`\x1b[33m[ATTENTION]\x1b[0m ${new Date().toISOString()} - ${message}`),
    result: (data: any) => console.log(`\x1b[35m[RÉSULTAT]\x1b[0m ${new Date().toISOString()} -`, data)
};
