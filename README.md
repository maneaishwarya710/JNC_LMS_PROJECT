Perfect! You can totally implement a **Byju’s-style floating discussion icon** at the **bottom right** of your LMS site that, when clicked, redirects the user to the Discussion Forum page.

---

### Here's how you can do it in Angular:

#### 1. **Create a Floating Button Component**

**`src/app/components/floating-discussion-button/floating-discussion-button.component.ts`**:

```ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-floating-discussion-button',
  templateUrl: './floating-discussion-button.component.html',
  styleUrls: ['./floating-discussion-button.component.css']
})
export class FloatingDiscussionButtonComponent {
  constructor(private router: Router) {}

  goToDiscussionForum() {
    this.router.navigate(['/discussion-forum']);
  }
}
```

---

**`floating-discussion-button.component.html`**:

```html
<button class="floating-btn" (click)="goToDiscussionForum()" title="Open Discussion Forum">
  💬
</button>
```

---

**`floating-discussion-button.component.css`**:

```css
.floating-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 15px 18px;
  font-size: 24px;
  cursor: pointer;
  z-index: 999;
  box-shadow: 0 4px 8px rgba(0,0,0,0.3);
}

.floating-btn:hover {
  background-color: #0056b3;
}
```

---

#### 2. **Use the Floating Button Globally**

In your main layout or in `app.component.html`, add:

```html
<router-outlet></router-outlet>
<app-floating-discussion-button></app-floating-discussion-button>
```

---

### Outcome:
- The floating chat icon appears on all pages.
- When clicked, it navigates users to the discussion forum page.

---

Would you like this button to be **hidden on the discussion page itself**? I can add that logic too if needed.
