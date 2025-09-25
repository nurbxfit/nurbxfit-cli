import validate from "validate-npm-package-name";

export function validateName(name: string): { valid: boolean, errors: string[] } {
    if (name == '.') {
        return {
            valid: true,
            errors: []
        }
    }

    const errors: string[] = [];
    if (name.length === 0) {
        errors.push("name cannot be empty!")
    }

    if (name.length >= 214) {
        errors.push("name cannot exceed 214 characters")
    }

    if (name.includes(' ')) {
        errors.push("name cannot contain spaces!")
    }

    const validatedName = validate(name);

    if (!validatedName.validForNewPackages) {
        if (validatedName.errors) {
            errors.push(...validatedName.errors);
        }
        if (validatedName.warnings) {
            errors.push(...validatedName.warnings);
        }
    }

    return {
        valid: errors.length === 0,
        errors
    };
}