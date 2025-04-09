export const formatFieldName = (field) => {
    // Casos especiales primero
    if (field === 'ano') return 'Año';

    // Reemplazar camelCase por espacios y capitalizar
    const withSpaces = field.replace(/([A-Z])/g, ' $1');

    // Capitalizar primera letra de cada palabra
    return withSpaces.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};