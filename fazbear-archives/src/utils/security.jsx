export function validateCredentials(name, id) {
  const trimmedName = (name || '').trim();
  const trimmedId = (id || '').trim();

  if (!trimmedName && !trimmedId) {
    return {
      isValid: false,
      error: 'Guard Name dan Security ID Number wajib diisi.',
    };
  }

  if (!trimmedName) {
    return {
      isValid: false,
      error: 'Guard Name wajib diisi.',
    };
  }

  if (!trimmedId) {
    return {
      isValid: false,
      error: 'Security ID Number wajib diisi.',
    };
  }

  if (trimmedName.length < 2) {
    return {
      isValid: false,
      error: 'Guard Name minimal 2 karakter.',
    };
  }

  return {
    isValid: true,
    error: null,
  };
}

export function formatSecurityId(id) {
  if (!id) return '';
  return id.trim().toUpperCase();
}

export function formatGuardName(name) {
  if (!name) return '';
  return name.trim();
}

export function getClearanceLevel(id) {
  const normalized = (id || '').toUpperCase();
  if (normalized.includes('MGR') || normalized.includes('ADM')) {
    return 'Level 4 - Command Security';
  }
  if (normalized.includes('TECH') || normalized.includes('ENG')) {
    return 'Level 3 - Systems & Animatronics';
  }
  if (normalized.includes('SR') || normalized.includes('VET')) {
    return 'Level 2 - Senior Night Watch';
  }
  return 'Level 1 - Night Shift Personnel';
}
