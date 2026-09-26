"""
Django admin configuration for the portfolio app.

Provides rich admin panels for managing projects, technologies,
and reviewing contact messages.
"""

from django.contrib import admin

from .models import ContactMessage, Project, Technology


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    """Admin panel for managing the tech stack display."""

    list_display = ('name', 'category', 'order', 'is_active', 'updated_at')
    list_filter = ('category', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('name', 'description')
    ordering = ('category', 'order')


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """Admin panel for managing portfolio projects."""

    list_display = ('title', 'category', 'featured', 'order', 'is_active', 'updated_at')
    list_filter = ('featured', 'is_active', 'category')
    list_editable = ('featured', 'order', 'is_active')
    search_fields = ('title', 'short_description', 'full_description')
    prepopulated_fields = {'slug': ('title',)}
    ordering = ('order',)
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'subtitle', 'category', 'featured', 'order', 'is_active'),
        }),
        ('Content', {
            'fields': ('short_description', 'full_description', 'overview', 'problem', 'approach', 'solution', 'engineering'),
        }),
        ('Technical', {
            'fields': ('technologies', 'features'),
        }),
        ('Links', {
            'fields': ('github_url', 'live_url'),
        }),
    )


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    """Admin panel for reviewing contact form submissions."""

    list_display = ('name', 'email', 'subject', 'is_read', 'created_at')
    list_filter = ('is_read', 'created_at')
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')
    ordering = ('-created_at',)
    actions = ['mark_as_read', 'mark_as_unread']

    @admin.action(description='Mark selected messages as read')
    def mark_as_read(self, request, queryset):
        """Bulk action to mark messages as read."""
        updated = queryset.update(is_read=True)
        self.message_user(request, f'{updated} message(s) marked as read.')

    @admin.action(description='Mark selected messages as unread')
    def mark_as_unread(self, request, queryset):
        """Bulk action to mark messages as unread."""
        updated = queryset.update(is_read=False)
        self.message_user(request, f'{updated} message(s) marked as unread.')

    def has_add_permission(self, request):
        """Disable manual creation — messages come from the contact form only."""
        return False
