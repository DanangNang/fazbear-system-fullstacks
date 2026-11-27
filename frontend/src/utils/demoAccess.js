export const DEMO_ADMIN_GUARD = {
    name: 'Nearbys',
    id: 'FAZ-0001',
};
    
export function isFullAccessAccount(guard) {
    if (!guard) return false;
    const nameMatch = (guard.name || guard.guardName || '').trim().toLowerCase() === 'nearbys';
    const idMatch = (guard.id || guard.guardId || '').trim().toUpperCase() === 'FAZ-0001';
    return nameMatch && idMatch;
}