#!/bin/bash

# 🔍 AMOS Tech Stack Detection - Auto-populate best practices based on project technologies
# This script analyzes the project and creates/updates tech_stack_practices.mdc

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(pwd)"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log() {
    echo -e "${BLUE}[TECH-DETECT]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

# Technology detection functions
detect_javascript_typescript() {
    local tech_info=""
    
    if [[ -f "package.json" ]]; then
        tech_info="JavaScript/TypeScript project detected\n"
        
        # Detect package manager
        if [[ -f "yarn.lock" ]]; then
            tech_info+="Package Manager: yarn\n"
        elif [[ -f "pnpm-lock.yaml" ]]; then
            tech_info+="Package Manager: pnpm\n"
        elif [[ -f "package-lock.json" ]]; then
            tech_info+="Package Manager: npm\n"
        else
            tech_info+="Package Manager: npm (default)\n"
        fi
        
        # Detect TypeScript
        if [[ -f "tsconfig.json" ]] || grep -q '"typescript"' package.json 2>/dev/null; then
            tech_info+="Language: TypeScript\n"
        else
            tech_info+="Language: JavaScript\n"
        fi
        
        # Detect frameworks
        if grep -q '"react"' package.json 2>/dev/null; then
            tech_info+="Framework: React\n"
            
            if grep -q '"next"' package.json 2>/dev/null; then
                tech_info+="Meta-Framework: Next.js\n"
            fi
        elif grep -q '"vue"' package.json 2>/dev/null; then
            tech_info+="Framework: Vue.js\n"
        elif grep -q '"@angular/core"' package.json 2>/dev/null; then
            tech_info+="Framework: Angular\n"
        elif grep -q '"svelte"' package.json 2>/dev/null; then
            tech_info+="Framework: Svelte\n"
        fi
        
        # Detect build tools
        if grep -q '"vite"' package.json 2>/dev/null; then
            tech_info+="Build Tool: Vite\n"
        elif grep -q '"webpack"' package.json 2>/dev/null; then
            tech_info+="Build Tool: Webpack\n"
        elif grep -q '"rollup"' package.json 2>/dev/null; then
            tech_info+="Build Tool: Rollup\n"
        fi
        
        # Detect testing frameworks
        if grep -q '"jest"' package.json 2>/dev/null; then
            tech_info+="Testing: Jest\n"
        elif grep -q '"vitest"' package.json 2>/dev/null; then
            tech_info+="Testing: Vitest\n"
        elif grep -q '"@playwright/test"' package.json 2>/dev/null; then
            tech_info+="E2E Testing: Playwright\n"
        fi
        
        # Detect styling
        if grep -q '"tailwindcss"' package.json 2>/dev/null; then
            tech_info+="Styling: Tailwind CSS\n"
        elif grep -q '"styled-components"' package.json 2>/dev/null; then
            tech_info+="Styling: Styled Components\n"
        elif grep -q '"@emotion/react"' package.json 2>/dev/null; then
            tech_info+="Styling: Emotion\n"
        fi
        
        # Detect state management
        if grep -q '"redux"' package.json 2>/dev/null; then
            tech_info+="State Management: Redux\n"
        elif grep -q '"zustand"' package.json 2>/dev/null; then
            tech_info+="State Management: Zustand\n"
        elif grep -q '"jotai"' package.json 2>/dev/null; then
            tech_info+="State Management: Jotai\n"
        fi
    fi
    
    echo -e "$tech_info"
}

detect_python() {
    local tech_info=""
    
    if [[ -f "requirements.txt" ]] || [[ -f "pyproject.toml" ]] || [[ -f "Pipfile" ]]; then
        tech_info="Python project detected\n"
        tech_info+="Language: Python\n"
        
        # Detect Python version
        if [[ -f ".python-version" ]]; then
            local py_version=$(cat .python-version)
            tech_info+="Python Version: $py_version\n"
        fi
        
        # Detect dependency management
        if [[ -f "poetry.lock" ]] || [[ -f "pyproject.toml" ]]; then
            tech_info+="Package Manager: Poetry\n"
        elif [[ -f "Pipfile" ]]; then
            tech_info+="Package Manager: Pipenv\n"
        elif [[ -f "requirements.txt" ]]; then
            tech_info+="Package Manager: pip\n"
        fi
        
        # Detect frameworks
        if [[ -f "requirements.txt" ]]; then
            if grep -q "fastapi" requirements.txt 2>/dev/null; then
                tech_info+="Framework: FastAPI\n"
            elif grep -q "django" requirements.txt 2>/dev/null; then
                tech_info+="Framework: Django\n"
            elif grep -q "flask" requirements.txt 2>/dev/null; then
                tech_info+="Framework: Flask\n"
            fi
            
            # Detect testing
            if grep -q "pytest" requirements.txt 2>/dev/null; then
                tech_info+="Testing: pytest\n"
            elif grep -q "unittest" requirements.txt 2>/dev/null; then
                tech_info+="Testing: unittest\n"
            fi
        fi
    fi
    
    echo -e "$tech_info"
}

detect_go() {
    local tech_info=""
    
    if [[ -f "go.mod" ]]; then
        tech_info="Go project detected\n"
        tech_info+="Language: Go\n"
        
        # Detect Go version
        local go_version=$(grep "^go " go.mod | awk '{print $2}')
        tech_info+="Go Version: $go_version\n"
        
        # Detect frameworks
        if grep -q "github.com/gin-gonic/gin" go.mod 2>/dev/null; then
            tech_info+="Framework: Gin\n"
        elif grep -q "github.com/gofiber/fiber" go.mod 2>/dev/null; then
            tech_info+="Framework: Fiber\n"
        elif grep -q "github.com/gorilla/mux" go.mod 2>/dev/null; then
            tech_info+="Framework: Gorilla Mux\n"
        fi
        
        # Detect testing
        tech_info+="Testing: Go Test (built-in)\n"
    fi
    
    echo -e "$tech_info"
}

detect_rust() {
    local tech_info=""
    
    if [[ -f "Cargo.toml" ]]; then
        tech_info="Rust project detected\n"
        tech_info+="Language: Rust\n"
        
        # Detect frameworks
        if grep -q "actix-web" Cargo.toml 2>/dev/null; then
            tech_info+="Framework: Actix Web\n"
        elif grep -q "warp" Cargo.toml 2>/dev/null; then
            tech_info+="Framework: Warp\n"
        elif grep -q "rocket" Cargo.toml 2>/dev/null; then
            tech_info+="Framework: Rocket\n"
        fi
        
        tech_info+="Testing: Cargo Test (built-in)\n"
        tech_info+="Package Manager: Cargo\n"
    fi
    
    echo -e "$tech_info"
}

detect_database() {
    local db_info=""
    
    # Check for database files
    if [[ -f "*.db" ]] || [[ -f "*.sqlite" ]] || [[ -f "*.sqlite3" ]]; then
        db_info+="Database: SQLite\n"
    fi
    
    # Check for database references in config files
    if [[ -f "package.json" ]]; then
        if grep -q '"pg"' package.json 2>/dev/null || grep -q '"postgres"' package.json 2>/dev/null; then
            db_info+="Database: PostgreSQL\n"
        elif grep -q '"mysql"' package.json 2>/dev/null; then
            db_info+="Database: MySQL\n"
        elif grep -q '"mongodb"' package.json 2>/dev/null || grep -q '"mongoose"' package.json 2>/dev/null; then
            db_info+="Database: MongoDB\n"
        elif grep -q '"redis"' package.json 2>/dev/null; then
            db_info+="Cache: Redis\n"
        fi
        
        # ORM detection
        if grep -q '"prisma"' package.json 2>/dev/null; then
            db_info+="ORM: Prisma\n"
        elif grep -q '"typeorm"' package.json 2>/dev/null; then
            db_info+="ORM: TypeORM\n"
        elif grep -q '"sequelize"' package.json 2>/dev/null; then
            db_info+="ORM: Sequelize\n"
        fi
    fi
    
    # Check Python requirements
    if [[ -f "requirements.txt" ]]; then
        if grep -q "psycopg2" requirements.txt 2>/dev/null; then
            db_info+="Database: PostgreSQL\n"
        elif grep -q "pymongo" requirements.txt 2>/dev/null; then
            db_info+="Database: MongoDB\n"
        elif grep -q "sqlalchemy" requirements.txt 2>/dev/null; then
            db_info+="ORM: SQLAlchemy\n"
        fi
    fi
    
    echo -e "$db_info"
}

# Generate best practices based on detected technologies
generate_best_practices() {
    local detected_tech="$1"
    local practices_file=".cursor/rules/amos/project-data/tech_stack_practices.mdc"
    
    log "Generating technology-specific best practices..."
    
    # Create directory if it doesn't exist
    mkdir -p "$(dirname "$practices_file")"
    
    # Start with template header
    cat > "$practices_file" << 'EOF'
---
description: AMOS Technology Best Practices - Auto-populated based on detected tech stack
globs: 
alwaysApply: false
---

# 🛠️ Technology Stack Best Practices

*Auto-generated based on detected project technologies. AMOS agents must follow these practices and use Context7 MCP for additional context.*

## Detected Technology Stack

EOF
    
    # Add detected technologies
    echo -e "$detected_tech" >> "$practices_file"
    
    # Add Context7 MCP integration section
    cat >> "$practices_file" << 'EOF'

## Context7 MCP Integration

### Required for AMOS Agents
All AMOS agents MUST use Context7 MCP when they need additional context beyond this file:

```bash
# Example Context7 queries for this project
mcp://context7/search?query="[framework] best practices"
mcp://context7/docs?technology="[language]"&topic="[specific_topic]"
mcp://context7/examples?pattern="[specific_pattern]"
```

### When to Use Context7 MCP
1. **Official Documentation**: When project practices need official documentation support
2. **API References**: For method signatures, parameters, return types
3. **Migration Guides**: When upgrading between versions
4. **Security Guidelines**: For official security recommendations
5. **Performance Patterns**: For optimization best practices

EOF
    
    # Add technology-specific sections based on detection
    if echo "$detected_tech" | grep -q "TypeScript\|JavaScript"; then
        add_javascript_practices "$practices_file"
    fi
    
    if echo "$detected_tech" | grep -q "React"; then
        add_react_practices "$practices_file"
    fi
    
    if echo "$detected_tech" | grep -q "Python"; then
        add_python_practices "$practices_file"
    fi
    
    if echo "$detected_tech" | grep -q "FastAPI"; then
        add_fastapi_practices "$practices_file"
    fi
    
    if echo "$detected_tech" | grep -q "PostgreSQL\|MySQL"; then
        add_database_practices "$practices_file"
    fi
    
    # Add closing notes
    cat >> "$practices_file" << 'EOF'

## AMOS Agent Integration Rules

### Before Implementation
1. **ALWAYS** read this file first: `tech_stack_practices.mdc`
2. **If unclear**: Use Context7 MCP for official documentation
3. **Follow both**: Project practices AND official recommendations

### During Implementation  
1. Apply patterns from this file
2. Use Context7 for complex/unfamiliar APIs
3. Document new patterns discovered

### After Implementation
1. Update this file if new patterns established
2. Commit with clear documentation of practices used

### Context7 Usage Examples for This Project
EOF
    
    # Add project-specific Context7 examples
    if echo "$detected_tech" | grep -q "React"; then
        echo '- `mcp://context7/docs?framework="react"&topic="hooks patterns"`' >> "$practices_file"
    fi
    
    if echo "$detected_tech" | grep -q "TypeScript"; then
        echo '- `mcp://context7/search?query="TypeScript utility types"`' >> "$practices_file"
    fi
    
    if echo "$detected_tech" | grep -q "FastAPI"; then
        echo '- `mcp://context7/docs?framework="fastapi"&topic="dependency injection"`' >> "$practices_file"
    fi
    
    echo "" >> "$practices_file"
    echo "---" >> "$practices_file"
    echo "*Auto-generated on $(date). Update as project evolves.*" >> "$practices_file"
}

# Add technology-specific practice sections
add_javascript_practices() {
    local file="$1"
    cat >> "$file" << 'EOF'

## JavaScript/TypeScript Best Practices

### Code Organization
```typescript
// Always use TypeScript interfaces
export interface ComponentProps {
  id: string;
  name: string;
  optional?: boolean;
}

// Prefer explicit typing over any
export const processData = (data: DataType): ProcessedData => {
  // Implementation
};

// Use async/await over promises
export const fetchData = async (): Promise<ApiResponse> => {
  try {
    const response = await api.getData();
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch: ${error.message}`);
  }
};
```

### Error Handling
- Always handle errors explicitly
- Use try-catch for async operations
- Provide meaningful error messages
- Log errors for debugging

### Context7 Usage
```bash
# When implementing TypeScript patterns
mcp://context7/docs?language="typescript"&topic="utility types"

# For modern JavaScript features
mcp://context7/search?query="ES2023 features best practices"
```

EOF
}

add_react_practices() {
    local file="$1"
    cat >> "$file" << 'EOF'

## React Best Practices

### Component Structure
```tsx
import { useState, useEffect, useCallback } from 'react';

interface Props {
  // Props interface at top
}

export const MyComponent: React.FC<Props> = ({ prop }) => {
  // 1. Hooks at top
  const [state, setState] = useState<Type>(initial);
  
  // 2. Event handlers with useCallback
  const handleClick = useCallback(() => {
    setState(prev => ({ ...prev, updated: true }));
  }, []);
  
  // 3. Effects after handlers
  useEffect(() => {
    // Side effects
  }, [dependency]);
  
  // 4. Render
  return <div>{/* JSX */}</div>;
};
```

### Performance
- Use React.memo for expensive components
- useCallback for event handlers
- useMemo for expensive calculations
- Lazy load with React.lazy

### Context7 Usage
```bash
# For React patterns
mcp://context7/docs?framework="react"&topic="hooks best practices"

# For performance optimization
mcp://context7/search?query="React performance optimization 2024"
```

EOF
}

add_python_practices() {
    local file="$1"
    cat >> "$file" << 'EOF'

## Python Best Practices

### Code Organization
```python
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, validator

class DataModel(BaseModel):
    """Always use type hints and docstrings."""
    name: str
    age: Optional[int] = None
    
    @validator('name')
    def validate_name(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty')
        return v.strip()

async def process_data(data: List[DataModel]) -> Dict[str, Any]:
    """Process data with proper error handling."""
    try:
        # Implementation
        return {"status": "success", "processed": len(data)}
    except Exception as e:
        raise ValueError(f"Processing failed: {str(e)}")
```

### Key Conventions
- Always use type hints
- Docstrings for all functions/classes
- async/await for I/O operations
- Proper exception handling
- Follow PEP 8 styling

### Context7 Usage
```bash
# For Python patterns
mcp://context7/docs?language="python"&topic="async patterns"

# For specific libraries
mcp://context7/search?query="pydantic validation best practices"
```

EOF
}

add_fastapi_practices() {
    local file="$1"
    cat >> "$file" << 'EOF'

## FastAPI Best Practices

### Route Structure
```python
from fastapi import HTTPException, status, Depends
from pydantic import BaseModel

class UserCreate(BaseModel):
    name: str
    email: str

@app.post("/users/", response_model=User, status_code=status.HTTP_201_CREATED)
async def create_user(
    user: UserCreate,
    db: Session = Depends(get_db)
) -> User:
    """Create user with proper validation and error handling."""
    try:
        return await user_service.create(db, user)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
```

### Key Conventions
- Pydantic models for validation
- Proper HTTP status codes
- Dependency injection
- Async route handlers
- Structured error responses

### Context7 Usage
```bash
# For FastAPI patterns
mcp://context7/docs?framework="fastapi"&topic="dependency injection"

# For API design
mcp://context7/search?query="REST API design best practices"
```

EOF
}

add_database_practices() {
    local file="$1"
    cat >> "$file" << 'EOF'

## Database Best Practices

### Query Patterns
```typescript
// Use transactions for multi-step operations
export class UserService {
  async createUserWithProfile(userData: CreateUserDto): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      const user = await queryRunner.manager.save(User, userData);
      const profile = await queryRunner.manager.save(Profile, {
        userId: user.id,
        ...userData.profileData
      });
      
      await queryRunner.commitTransaction();
      return { ...user, profile };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
```

### Key Conventions
- Use transactions for data consistency
- Implement proper error handling
- Use connection pooling
- Index frequently queried columns
- Validate input before queries

### Context7 Usage
```bash
# For database optimization
mcp://context7/search?query="PostgreSQL indexing strategies"

# For ORM patterns
mcp://context7/docs?technology="typeorm"&topic="relations"
```

EOF
}

# Main execution
main() {
    log "Starting technology stack detection..."
    
    # Detect technologies
    local js_tech=$(detect_javascript_typescript)
    local py_tech=$(detect_python)
    local go_tech=$(detect_go)
    local rust_tech=$(detect_rust)
    local db_tech=$(detect_database)
    
    # Combine all detected technologies
    local all_tech="$js_tech$py_tech$go_tech$rust_tech$db_tech"
    
    if [[ -z "$all_tech" ]]; then
        warn "No supported technologies detected. Please ensure you're in a project directory."
        exit 1
    fi
    
    log "Detected technologies:"
    echo -e "$all_tech"
    
    # Generate best practices file
    generate_best_practices "$all_tech"
    
    success "Technology stack best practices generated at: .cursor/rules/amos/project-data/tech_stack_practices.mdc"
    success "AMOS agents will now follow these practices and use Context7 MCP for additional context."
    
    # Create git checkpoint
    if git rev-parse --git-dir > /dev/null 2>&1; then
        git add .cursor/rules/amos/project-data/tech_stack_practices.mdc
        git commit -m "feat: auto-generate technology stack best practices

Auto-detected project technologies:
$(echo -e "$all_tech" | sed 's/^/- /')

AMOS agents will follow these practices and use Context7 MCP for official documentation.

🤖 AMOS Auto-Checkpoint" && git push origin HEAD
        success "Technology practices committed to git"
    fi
}

# Run if executed directly
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    main "$@"
fi