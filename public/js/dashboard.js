document.addEventListener('DOMContentLoaded', async () => {
  const loadingSkeleton = document.getElementById('loadingSkeleton');
  const userContent = document.getElementById('userContent');
  const avatarImg = document.getElementById('userAvatar');
  const displayNameEl = document.getElementById('userDisplayName');
  const emailEl = document.getElementById('userEmail');
  const googleIdEl = document.getElementById('userGoogleId');
  const createdAtEl = document.getElementById('userCreatedAt');

  try {
    const response = await fetch('/auth/me', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      // Unauthorized or invalid session -> redirect to login
      window.location.href = '/?error=unauthorized';
      return;
    }

    const data = await response.json();

    if (data.success && data.user) {
      const user = data.user;

      // Populate user info
      displayNameEl.textContent = user.displayName || 'Google User';
      emailEl.textContent = user.email || 'No email provided';
      googleIdEl.textContent = user.googleId || 'N/A';

      if (user.avatarUrl) {
        avatarImg.src = user.avatarUrl;
        avatarImg.alt = `${user.displayName}'s avatar`;
      } else {
        // Fallback default avatar
        avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=818cf8&color=fff`;
      }

      if (user.createdAt) {
        const formattedDate = new Date(user.createdAt).toLocaleDateString(undefined, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        });
        createdAtEl.textContent = formattedDate;
      }

      // Hide skeleton loading and show user content
      loadingSkeleton.style.display = 'none';
      userContent.style.display = 'block';
    } else {
      window.location.href = '/?error=session_invalid';
    }
  } catch (error) {
    console.error('[Dashboard Error]:', error);
    window.location.href = '/?error=network_error';
  }
});
