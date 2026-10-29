import { Locator, Page } from '@playwright/test';

export class EditorPage {
    readonly editorInput: Locator;
    readonly articleAboutInput: Locator;
    readonly articleContentInput: Locator;
    readonly enterTagsInput: Locator;

    constructor(private readonly page: Page) {
        this.editorInput = this.page.getByPlaceholder('Article Title');
        this.articleAboutInput = this.page.getByPlaceholder("What's this article about?");
        this.articleContentInput = this.page.getByPlaceholder('Write your article (in markdown)');
        this.enterTagsInput = this.page.getByPlaceholder('Enter tags');
    }

    async goto() {
        await this.page.goto('/editor');
    }

    async fillArticleFields(title: string, about: string, content: string, tags: string[]) {
        await this.editorInput.fill(title);
        await this.articleAboutInput.fill(about);
        await this.articleContentInput.fill(content);

        for (const tag of tags) {
            await this.enterTagsInput.fill(tag);
            await this.enterTagsInput.press('Enter');
        }
    }

    async publishArticle(title: string, about: string, content: string, tags: string[]) {
        await this.goto();
        await this.fillArticleFields(title, about, content, tags);
        await this.page.getByRole('button', { name: 'Publish Article' }).click();
    }
}