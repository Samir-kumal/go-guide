'use client'

import { CodeBlock, Note, Tip, ComparisonTable, Warning } from '@/components/ui'

export function StructTutorial() {
  return (
    <div className="space-y-6">
      <section>
        <h2 id="struct-tutorial" className="text-[#1a73e8] mt-10 text-2xl font-semibold">
          Struct Types - The Complete Guide
        </h2>
        
        <div className="bg-[#f8f9fa] p-4 rounded-lg my-4 border-l-4 border-[#1a73e8]">
          <p className="font-semibold mb-2">Learning Roadmap</p>
          <ul className="text-sm space-y-1">
            <li>1. What is a struct? (analogy: form/blueprint)</li>
            <li>2. Defining structs</li>
            <li>3. Creating instances (named, positional, zero, new(), factory)</li>
            <li>4. Embedded fields (composition, not inheritance!)</li>
            <li>5. Struct tags (json, Laravel $casts)</li>
            <li>6. Methods (value vs pointer receiver)</li>
            <li>7. Struct comparison (==, reflect.DeepEqual)</li>
            <li>8. Patterns (DTO, Request/Response, Config)</li>
            <li>9. Self-referencing structs</li>
            <li>10. Cheat sheet</li>
          </ul>
        </div>
        
        <p className="text-[#5f6368] mt-4">
          By the end of this tutorial, you will understand Go structs inside and out, 
          with PHP/Laravel comparisons to help you relate to concepts you already know!
        </p>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-8 text-xl font-semibold">
          What is a Struct?
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          A struct is a composite data type that groups together fields of different types.
          Think of it like a form or blueprint!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">The Analogy</h4>
        
        <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-4">
          <p className="font-semibold text-[#2e7d32]">Think of it like this:</p>
          <ul className="mt-2 space-y-2">
            <li>Struct = A form or blueprint</li>
            <li>Fields = The questions on the form (name, email, age, etc.)</li>
            <li>Instance = A filled-out form with actual values</li>
          </ul>
        </div>

        <h4 className="text-[#5f6368] mt-6 font-semibold">PHP/Laravel Comparison</h4>
        
        <ComparisonTable>
          <thead>
            <tr>
              <th>Language</th>
              <th>Concept</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Go</td>
              <td>struct</td>
              <td>Composite type with named fields</td>
            </tr>
            <tr>
              <td>PHP</td>
              <td>class</td>
              <td>Object-oriented, full class needed</td>
            </tr>
            <tr>
              <td>Laravel</td>
              <td>Eloquent Model</td>
              <td>ORM with schema definition</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <CodeBlock>{"// Go: Simple struct\ntype User struct {\n    Name  string\n    Email string\n    Age   int\n}\n\n// PHP: Full class required\nclass User {\n    public string $Name;\n    public string $Email;\n    public int $Age;\n}\n\n// Laravel: Eloquent Model\n// class User extends Model {\n//     protected $fillable = ['name', 'email', 'age'];\n// }"}</CodeBlock>

        <Tip>
          AHA Moment: Go structs are lightweight - no classes, no inheritance, just data and behavior!
        </Tip>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Defining Structs
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Lets learn how to define structs in Go!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">1. Basic Struct Definition</h4>
        <p className="text-[#5f6368] mt-2">
          Define a struct with named fields and types:
        </p>

        <CodeBlock>{"// Define the struct type\ntype User struct {\n    Name  string\n    Email string\n    Age   int\n    Active bool\n}\n\n// Use it\nvar user User\nfmt.Printf(\"%+v\\n\", user)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">2. Field Tags (Metadata)</h4>
        <p className="text-[#5f6368] mt-2">
          Add struct tags for serialization and validation:
        </p>

        <CodeBlock>{"type User struct {\n    Name  string `json:\"name\"`\n    Email string `json:\"email\" validate:\"required,email\"`\n    Age   int    `json:\"age\"`\n}\n\n// JSON serialization\nuser := User{Name: \"Alice\", Email: \"alice@example.com\", Age: 25}\ndata, _ := json.Marshal(user)\nfmt.Println(string(data))\n// Output: {\"name\":\"Alice\",\"email\":\"alice@example.com\",\"age\":25}"}</CodeBlock>

        <Note>
          Struct tags are metadata - they don't affect the struct directly but are used by packages like encoding/json, validation libraries, ORMs, etc.
        </Note>

        <h4 className="text-[#5f6368] mt-6 font-semibold">3. Anonymous Structs</h4>
        <p className="text-[#5f6368] mt-2">
          Define and use a struct without giving it a name:
        </p>

        <CodeBlock>{"// Anonymous struct - no type name\nperson := struct {\n    Name string\n    Age  int\n}{\n    Name: \"Bob\",\n    Age:  30,\n}\n\nfmt.Println(person.Name, person.Age)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">4. Nested Structs</h4>
        <p className="text-[#5f6368] mt-2">
          Embed one struct inside another:
        </p>

        <CodeBlock>{"type Address struct {\n    Street  string\n    City    string\n    Country string\n}\n\ntype Person struct {\n    Name    string\n    Address Address  // Embed: NOT anonymous field\n}\n\nperson := Person{\n    Name: \"Alice\",\n    Address: Address{\n        Street:  \"123 Main St\",\n        City:    \"NYC\",\n        Country: \"USA\",\n    },\n}\n\nfmt.Println(person.Address.City)"}</CodeBlock>

        <div className="bg-[#e3f2fd] border-l-4 border-[#2196f3] p-4 my-6">
          <p className="font-semibold text-[#1565c0]">TRY IT: Define Structs</p>
          <p className="mt-2 text-sm">Practice defining structs:</p>
          <CodeBlock>{"// Exercise 1: Define a Product struct\ntype Product struct {\n    Name  string\n    Price float64\n    Stock int\n}\n\n// Exercise 2: Create an instance\nproduct := Product{\n    Name:  \"Laptop\",\n    Price: 999.99,\n    Stock: 10,\n}\nfmt.Printf(\"%+v\\n\", product)\n\n// Exercise 3: Nested struct\ntype Seller struct {\n    Name    string\n    Product Product\n}\n\nseller := Seller{\n    Name:    \"TechStore\",\n    Product: product,\n}\nfmt.Println(seller.Product.Name)"}</CodeBlock>
        </div>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Creating Instances
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          There are multiple ways to create struct instances in Go!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">1. Named Field Initialization</h4>
        <p className="text-[#5f6368] mt-2">Most readable and recommended:</p>

        <CodeBlock>{"type User struct {\n    Name  string\n    Email string\n    Age   int\n}\n\n// Best: use field names!\nuser := User{\n    Name:  \"Alice\",\n    Email: \"alice@example.com\",\n    Age:   25,\n}\n\nfmt.Println(user.Name)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">2. Positional Initialization</h4>
        <p className="text-[#5f6368] mt-2">Order matters - less readable:</p>

        <CodeBlock>{"// Uses order of fields in struct definition\nuser := User{\"Alice\", \"alice@example.com\", 25}\n\nfmt.Println(user.Name) // Alice\nfmt.Println(user.Age)  // 25"}</CodeBlock>

        <Warning>
          Positional initialization is fragile! If you add/remove fields, it breaks.
          Always prefer named initialization!
        </Warning>

        <h4 className="text-[#5f6368] mt-6 font-semibold">3. Zero Value</h4>
        <p className="text-[#5f6368] mt-2">Declaring without initializing gives zero values:</p>

        <CodeBlock>{"var user User\n// Zero values: Name=\"\", Email=\"\", Age=0\n\nfmt.Printf(\"%+v\\n\", user)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">4. Using new()</h4>
        <p className="text-[#5f6368] mt-2">
          new() returns a pointer to zero-value struct:
        </p>

        <CodeBlock>{"// new(Type) returns *Type\nuser := new(User)\n// user is *User (pointer)\n\n// Fields are zero values\nfmt.Println(user.Name) // \"\"\n\n// Can assign after\nuser.Name = \"Bob\""}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">5. Factory Functions</h4>
        <p className="text-[#5f6368] mt-2">
          Create helper functions for complex initialization:
        </p>

        <CodeBlock>{"// Factory function - returns pointer\nfunc NewUser(name, email string, age int) *User {\n    return &User{\n        Name:  name,\n        Email: email,\n        Age:   age,\n    }\n}\n\n// Constructor pattern\nfunc NewUserWithDefaults(email string) *User {\n    return &User{\n        Email: email,\n        Age:   18,  // default\n    }\n}\n\nuser := NewUser(\"Alice\", \"alice@example.com\", 25)\nuser2 := NewUserWithDefaults(\"bob@example.com\")"}</CodeBlock>

        <Tip>
          Factory functions are idiomatic in Go when you need:
          - Default values
          - Validation
          - Complex initialization logic
        </Tip>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Method</th>
              <th>Returns</th>
              <th>Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{"User{...}"}</td>
              <td>User (value)</td>
              <td>Most cases</td>
            </tr>
            <tr>
              <td>{"User{a,b,c}"}</td>
              <td>User (value)</td>
              <td>Avoid - fragile</td>
            </tr>
            <tr>
              <td>{"var u User"}</td>
              <td>User (zero)</td>
              <td>Declaration</td>
            </tr>
            <tr>
              <td>{"new(User)"}</td>
              <td>*User (pointer)</td>
              <td>Dynamic allocation</td>
            </tr>
            <tr>
              <td>{"&User{...}"}</td>
              <td>*User (pointer)</td>
              <td>Explicit pointer</td>
            </tr>
            <tr>
              <td>factory()</td>
              <td>*User (pointer)</td>
              <td>Complex init</td>
            </tr>
          </tbody>
        </ComparisonTable>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Embedded Fields (Composition)
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Go uses composition (embedding) instead of inheritance!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">What is Embedding?</h4>
        
        <div className="bg-[#ffebee] border-l-4 border-[#f44336] p-4 my-4">
          <p className="font-semibold text-[#c62828]">Important:</p>
          <p>Embedding is NOT inheritance! There's no "is-a" relationship.</p>
          <p>It's called "composition over inheritance".</p>
        </div>

        <CodeBlock>{"// Embedded type - no field name!\ntype Reader struct {\n    io.Reader  // Embedded - promote methods\n}\n\n// Now Reader has all Reader's methods!\nr := Reader{\n    // ...\n}\n\n// Can use Read() directly!\ndata := make([]byte, 1024)\nn, _ := r.Read(data)  // Promoted from io.Reader"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Full Example: Logger</h4>
        
        <CodeBlock>{"type Logger struct {\n    Prefix string\n}\n\nfunc (l *Logger) Log(msg string) {\n    fmt.Println(l.Prefix + \": \" + msg)\n}\n\n// Embed Logger into Service\ntype Service struct {\n    Logger  // Embedded - no field name\n    Name    string\n}\n\n// Create service - embedded is automatic!\nsvc := Service{\n    Logger: Logger{Prefix: \"[SERVICE]\"},\n    Name:   \"Auth\",\n}\n\n// Can call Log() directly!\nsvc.Log(\"Starting...\")\n\n// Or use full path\nsvc.Logger.Log(\"Also works\")"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Promoted Fields</h4>
        
        <CodeBlock>{"type User struct {\n    Name string\n}\n\ntype Employee struct {\n    User    // Embedded\n    Salary int\n}\n\nemp := Employee{\n    User:   User{Name: \"Alice\"},\n    Salary: 50000,\n}\n\n// Access Name directly (promoted)\nfmt.Println(emp.Name)\n\n// Or full path\nfmt.Println(emp.User.Name)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel Trait Comparison</h4>
        
        <CodeBlock>{"// Laravel: traits\ntrait Loggable {\n    public function log($msg) {\n        // ...\n    }\n}\n\nclass Service {\n    use Loggable;  // trait\n}\n\n// Go: composition via embedding\ntype Service struct {\n    Logger  // embed\n}\n\n// Both achieve code reuse differently!"}</CodeBlock>

        <Warning>
          Gotcha: Method conflicts with embedding!
          If both types have SameMethod(), you must use full path.
        </Warning>

        <Tip>
          When to use embedding:
          - Code reuse (like traits)
          - Interface implementation
          - Adding capabilities
        </Tip>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Struct Tags
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Struct tags add metadata for serialization, validation, and ORMs!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">1. JSON Tags</h4>
        
        <CodeBlock>{"type User struct {\n    Name  string `json:\"name\"`\n    Email string `json:\"email\"`\n    Age   int    `json:\"age,omitempty\"`\n}\n\n// Marshal to JSON\nuser := User{Name: \"Alice\", Email: \"alice@example.com\"}\ndata, _ := json.Marshal(user)\nfmt.Println(string(data))\n// Output: {\"name":"Alice","email":"alice@example.com"}\n// Note: Age is omitted (zero value!)"}</CodeBlock>

        <ComparisonTable>
          <thead>
            <tr>
              <th>Tag</th>
              <th>Effect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{"json:\"name\""}</td>
              <td>Field maps to "name" in JSON</td>
            </tr>
            <tr>
              <td>{"json:\"-\"}</td>
              <td>Ignore this field</td>
            </tr>
            <tr>
              <td>{"json:\"name,omitempty\"}"}</td>
              <td>Omit if empty/zero</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">2. Validation Tags</h4>
        
        <CodeBlock>{"type RegisterRequest struct {\n    Username string `validate:\"required,min=3,max=20\"`\n    Email    string `validate:\"required,email\"`\n    Password string `validate:\"required,min=8\"`\n    Age      int    `validate:\"gte=18\"`\n}\n\n// Using go-playground/validator\n// validate.Struct(request)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">3. Database/ORM Tags</h4>
        
        <CodeBlock>{"type User struct {\n    ID        uint   `gorm:\"primaryKey\"`\n    Name      string `gorm:\"size:100;not null\"`\n    Email     string `gorm:\"uniqueIndex\"`\n    CreatedAt time.Time\n    UpdatedAt time.Time\n}\n\n// GORM will:\n// - Create 'users' table\n// - Add primary key\n// - Create unique index on Email"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel $casts Comparison</h4>
        
        <CodeBlock>{"// Laravel Eloquent Model\nclass User extends Model {\n    protected $casts = [\n        'email_verified_at' => 'datetime',\n        'is_admin' => 'boolean',\n        'options' => 'array',\n    ];\n}\n\n// In Go with json tags:\ntype User struct {\n    EmailVerifiedAt time.Time `json:\"email_verified_at\"`\n    IsAdmin        bool    `json:\"is_admin\"`\n    Options       []string `json:\"options\"`\n}\n\n// Use custom unmarshal for type casting\n// json.Unmarshal automatically casts from JSON types"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">4. YAML, XML, and More</h4>
        
        <CodeBlock>{"type Config struct {\n    Name string `yaml:\"name\" xml:\"name\"`\n    Port int    `yaml:\"port\" xml:\"port\"`\n    Host string `yaml:\"host\" xml:\"host\"`\n}\n\n// Use same struct for multiple formats!"}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Methods (Value vs Pointer Receiver)
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Go methods are defined on types, not inside types!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">1. Value Receiver</h4>
        <p className="text-[#5f6368] mt-2">Receives a copy of the struct:</p>

        <CodeBlock>{"type User struct {\n    Name string\n    Age  int\n}\n\n// Value receiver - gets a COPY\nfunc (u User) Birthday() {\n    u.Age++  // Modifies copy only!\n}\n\nuser := User{Name: \"Alice\", Age: 25}\nuser.Birthday()\nfmt.Println(user.Age)  // Still 25!\n\n// To actually modify, need to return or use pointer"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">2. Pointer Receiver</h4>
        <p className="text-[#5f6368] mt-2">Modify the original struct:</p>

        <CodeBlock>{"// Pointer receiver - modifies original\nfunc (u *User) Birthday() {\n    u.Age++  // Modifies original!\n}\n\nuser := User{Name: \"Alice\", Age: 25}\nuser.Birthday()\nfmt.Println(user.Age)  // 26!\n\n// Go auto-converts &user to user for method calls\n(&user).Birthday() // Also works"}</CodeBlock>

        <Warning>
          Common Mistake: Using value receiver when you want to modify!
          Always use pointer receiver (*) for methods that modify the struct.
        </Warning>

        <h4 className="text-[#5f6368] mt-6 font-semibold">When to Use Each</h4>
        
        <ComparisonTable>
          <thead>
            <tr>
              <th>Receiver</th>
              <th>Use When</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Value (User)</td>
              <td>Read-only, no modification</td>
            </tr>
            <tr>
              <td>Pointer (*User)</td>
              <td>Modify the struct</td>
            </tr>
            <tr>
              <td>Pointer (*User)</td>
              <td>Large struct (avoid copy)</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Laravel Comparison</h4>
        
        <CodeBlock>{"// PHP/Laravel: methods inside class\nclass User {\n    public function birthday() {\n        $this->age++;\n    }\n}\n\n// Go: methods outside struct\nfunc (u *User) Birthday() {\n    u.Age++\n}"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Full Example</h4>
        
        <CodeBlock>{"type User struct {\n    Name string\n    Age  int\n}\n\n// Read-only method (value receiver)\nfunc (u User) IsAdult() bool {\n    return u.Age >= 18\n}\n\n// Modifier method (pointer receiver)\nfunc (u *User) SetAge(age int) {\n    if age > 0 {\n        u.Age = age\n    }\n}\n\n// Factory method\nfunc NewUser(name string, age int) *User {\n    return &User{Name: name, Age: age}\n}\n\nuser := NewUser(\"Alice\", 25)\nfmt.Println(user.IsAdult()) // true\nuser.SetAge(26)\nfmt.Println(user.Age)    // 26"}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Struct Comparison
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Comparing structs in Go!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">1. Direct Comparison (==)</h4>
        <p className="text-[#5f6368] mt-2">
          Use == for comparable structs (no slices, maps, pointers to comparable):
        </p>

        <CodeBlock>{"type Point struct {\n    X int\n    Y int\n}\n\np1 := Point{X: 1, Y: 2}\np2 := Point{X: 1, Y: 2}\np3 := Point{X: 3, Y: 4}\n\nfmt.Println(p1 == p2)  // true\nfmt.Println(p1 == p3)  // false"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">2. DeepEqual (reflect)</h4>
        <p className="text-[#5f6368] mt-2">
          Compare complex structs with slices, maps:
        </p>

        <CodeBlock>{"type User struct {\n    Name   string\n    Scores []int\n}\n\nu1 := User{Name: \"Alice\", Scores: []int{1, 2, 3}}\nu2 := User{Name: \"Alice\", Scores: []int{1, 2, 3}}\n\n// Can't use == for structs with slices!\n// fmt.Println(u1 == u2) // ERROR!\n\n// Use DeepEqual\nfmt.Println(reflect.DeepEqual(u1, u2))  // true"}</CodeBlock>

        <Note>
          DeepEqual compares everything recursively - slices, maps, pointers!
        </Note>

        <h4 className="text-[#5f6368] mt-6 font-semibold">3. Incomparable Structs</h4>
        
        <CodeBlock>{"// Struct with slice field - NOT comparable\ntype User struct {\n    Name   string\n    Scores []int  // Slice - makes struct incomparable\n}\n\n// var u1, u2 User\n// fmt.Println(u1 == u2) // ERROR: cannot compare"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">4. Custom Comparison</h4>
        
        <CodeBlock>{"type User struct {\n    ID   int\n    Name string\n}\n\n// Implement custom comparison\nfunc (u User) Equals(other User) bool {\n    return u.ID == other.ID\n}\n\n// Or use specific field comparison\nu1 := User{ID: 1, Name: \"Alice\"}\nu2 := User{ID: 1, Name: \"Bob\"}\n\nfmt.Println(u1.Equals(u2))  // true - same ID"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">5. Maps with Struct Keys</h4>
        
        <CodeBlock>{"type Point struct {\n    X int\n    Y int\n}\n\n// Comparable structs can be map keys!\nm := make(map[Point]string)\n\nm[Point{X: 1, Y: 2}] = \"A\"\nm[Point{X: 3, Y: 4}] = \"B\"\n\nfmt.Println(m[Point{X: 1, Y: 2}])  // A"}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Common Patterns
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Real-world struct patterns you'll use!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">1. DTO (Data Transfer Object)</h4>
        
        <CodeBlock>{"// Request DTO - input to API\ntype CreateUserRequest struct {\n    Name  string `json:\"name\" validate:\"required\"`\n    Email string `json:\"email\" validate:\"required,email\"`\n    Age   int    `json:\"age\" validate:\"gte=18\"`\n}\n\n// Response DTO - output from API\ntype UserResponse struct {\n    ID    int    `json:\"id\"`\n    Name  string `json:\"name\"`\n    Email string `json:\"email\"`\n}\n\n// Handler\nfunc CreateUser(w http.ResponseWriter, r *http.Request) {\n    var req CreateUserRequest\n    json.NewDecoder(r.Body).Decode(&req)\n    \n    // Validate req here...\n    \n    // Return response\n    resp := UserResponse{ID: 1, Name: req.Name, Email: req.Email}\n    json.NewEncoder(w).Encode(resp)\n}"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">2. Config Pattern</h4>
        
        <CodeBlock>{"// Application config\ntype Config struct {\n    Server struct {\n        Port int    `yaml:\"port\"`\n        Host string `yaml:\"host\"`\n    }\n    Database struct {\n        Host     string `yaml:\"host\"`\n        Port     int    `yaml:\"port\"`\n        Name     string `yaml:\"name\"`\n        User     string `yaml:\"user\"`\n        Password string `yaml:\"password\"`\n    }\n}\n\n// Load config\nfunc LoadConfig(path string) (*Config, error) {\n    data, err := os.ReadFile(path)\n    if err != nil {\n        return nil, err\n    }\n\n    var cfg Config\n    if err := yaml.Unmarshal(data, &cfg); err != nil {\n        return nil, err\n    }\n\n    return &cfg, nil\n}\n\n// config.yaml:\n// server:\n//   port: 8080\n//   host: localhost\n// database:\n//   host: localhost\n//   port: 5432\n//   name: myapp\n//   user: user\n//   password: pass"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">3. Result/Error Pattern</h4>
        
        <CodeBlock>{"// Function returning struct\ntype Result struct {\n    Data    interface{}\n    Error  error\n    Status int\n}\n\nfunc fetchUser(id int) Result {\n    if id <= 0 {\n        return Result{\n            Error:  errors.New(\"invalid id\"),\n            Status: 400,\n        }\n    }\n\n    return Result{\n        Data:    User{ID: id, Name: \"Alice\"},\n        Error:  nil,\n        Status: 200,\n    }\n}\n\n// Usage\nres := fetchUser(1)\nif res.Error != nil {\n    // handle error\n}\nfmt.Println(res.Data)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">4. Laravel Form Request</h4>
        
        <CodeBlock>{"// Laravel: FormRequest class\n// class RegisterRequest extends FormRequest\n// {\n//     public function rules() {\n//         return [\n//             'name' => 'required|min:3',\n//             'email' => 'required|email',\n//         ];\n//     }\n// }\n\n\n// Go equivalent: Request struct with validation\ntype RegisterRequest struct {\n    Name  string `json:\"name\" validate:\"required,min=3\"`\n    Email string `json:\"email\" validate:\"required,email\"`\n}\n\nfunc ValidateRequest(req RegisterRequest) error {\n    // Use validator package\n    return validator.Struct(req)\n}"}</CodeBlock>
      </section>

      <section>
        <h3 className="text-[#1a73e8] mt-10 text-xl font-semibold">
          Self-Referencing Structs
        </h3>
        
        <p className="mt-3 text-[#5f6368]">
          Structs can reference themselves for linked structures!
        </p>

        <h4 className="text-[#5f6368] mt-6 font-semibold">1. Linked List Node</h4>
        
        <CodeBlock>{"type Node struct {\n    Value int\n    Next  *Node  // Self-reference via pointer!\n}\n\n// Create linked list: 1 -> 2 -> 3\nnode3 := &Node{Value: 3, Next: nil}\nnode2 := &Node{Value: 2, Next: node3}\nnode1 := &Node{Value: 1, Next: node2}\n\n// Traverse\ncurrent := node1\nfor current != nil {\n    fmt.Println(current.Value)\n    current = current.Next\n}"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">2. Binary Tree Node</h4>
        
        <CodeBlock>{"type TreeNode struct {\n    Value int\n    Left  *TreeNode\n    Right *TreeNode\n}\n\n// Build tree:\n//       2\n//      / \\\n//     1   3\nroot := &TreeNode{\n    Value: 2,\n    Left:  &TreeNode{Value: 1},\n    Right: &TreeNode{Value: 3},\n}\n\n// In-order traversal\nfunc InOrder(n *TreeNode) {\n    if n == nil {\n        return\n    }\n    InOrder(n.Left)\n    fmt.Println(n.Value)\n    InOrder(n.Right)\n}\n\nInOrder(root)"}</CodeBlock>

        <h4 className="text-[#5f6368] mt-6 font-semibold">3. Stack/Queue</h4>
        
        <CodeBlock>{"type Stack struct {\n    items []int\n}\n\nfunc (s *Stack) Push(item int) {\n    s.items = append(s.items, item)\n}\n\nfunc (s *Stack) Pop() int {\n    if len(s.items) == 0 {\n        return 0\n    }\n    item := s.items[len(s.items)-1]\n    s.items = s.items[:len(s.items)-1]\n    return item\n}\n\nstack := &Stack{}\nstack.Push(1)\nstack.Push(2)\nstack.Push(3)\nfmt.Println(stack.Pop())  // 3\nfmt.Println(stack.Pop())  // 2"}</CodeBlock>

        <Warning>
          Important: Self-referencing requires POINTER (*Type), not the type itself!
          This compiles: Next *Node
          This errors: Next Node
        </Warning>
      </section>

      <section className="mt-10">
        <h3 className="text-[#1a73e8] text-2xl font-semibold">
          CHEAT SHEET: Struct Operations
        </h3>
        
        <ComparisonTable>
          <thead>
            <tr>
              <th>Operation</th>
              <th>Code</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Define</td>
              <td>{"type User struct { Name string }"}</td>
              <td>Struct type definition</td>
            </tr>
            <tr>
              <td>Create</td>
              <td>{"User{Name: \"Alice\"}"}</td>
              <td>Named initialization</td>
            </tr>
            <tr>
              <td>Create</td>
              <td>{"new(User)"}</td>
              <td>Pointer to zero-value</td>
            </tr>
            <tr>
              <td>Create</td>
              <td>{"&User{...}"}</td>
              <td>Pointer to values</td>
            </tr>
            <tr>
              <td>Field</td>
              <td>{"user.Name"}</td>
              <td>Access field</td>
            </tr>
            <tr>
              <td>Method</td>
              <td>{"func (u *User) Foo()"}</td>
              <td>Pointer receiver method</td>
            </tr>
            <tr>
              <td>Embed</td>
              <td>{"type S { Logger }"}</td>
              <td>Embedded field</td>
            </tr>
            <tr>
              <td>Compare</td>
              <td>{"u1 == u2"}</td>
              <td>Direct comparison</td>
            </tr>
            <tr>
              <td>Deep Equal</td>
              <td>{"reflect.DeepEqual(a,b)"}</td>
              <td>Compare complex structs</td>
            </tr>
            <tr>
              <td>JSON</td>
              <td>{"json.Marshal(user)"}</td>
              <td>Serialize to JSON</td>
            </tr>
          </tbody>
        </ComparisonTable>

        <h4 className="text-[#5f6368] mt-6 font-semibold">Struct Tags Summary</h4>
        
        <CodeBlock>{"type User struct {\n    Name  string `json:\"name\"`           // JSON field name\n    Email string `json:\"email,omitempty\"`  // Omit if empty\n    Age   int    `validate:\"gte=18\"`           // Validation\n    ID    uint   `gorm:\"primaryKey\"`        // ORM primary key\n}"}</CodeBlock>
      </section>

      <div className="bg-[#e8f5e9] border-l-4 border-[#4caf50] p-4 my-6">
        <p className="font-semibold text-[#2e7d32]">AHA MOMENT: The Key Takeaways</p>
        <ul className="mt-2 space-y-2">
          <li>Struct = blueprint/form for composite data</li>
          <li>Use named initialization (not positional)</li>
          <li>Zero values when declared, not initialized</li>
          <li>Pointer receiver (*) for methods that modify</li>
          <li>Embedding = composition (NOT inheritance)</li>
          <li>Struct tags control JSON, validation, ORM</li>
          <li>Self-reference uses POINTER, not value</li>
        </ul>
      </div>
    </div>
  )
}