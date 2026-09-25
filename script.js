// Play one project preview when the visitor focuses on it.
document.querySelectorAll('.project').forEach((card) => {
  const video = card.querySelector('video');

  const start = () => {
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const stop = () => {
    video.pause();
    video.currentTime = 0;
  };

  card.addEventListener('mouseenter', start);
  card.addEventListener('mouseleave', stop);
  card.addEventListener('focusin', start);
  card.addEventListener('focusout', stop);
});

// Compose an email with the form details. This does not send automatically.
document.getElementById('contact-form').addEventListener('submit', function (event) {
  event.preventDefault();

  const details = new FormData(this);
  const body = [
    `Name: ${details.get('name')}`,
    `Email: ${details.get('email')}`,
    `Business: ${details.get('business')}`,
    '',
    details.get('message'),
  ].join('\n');

  const subject = encodeURIComponent(`Website inquiry from ${details.get('name')}`);
  window.location.href = `mailto:hello@moedevs.com?subject=${subject}&body=${encodeURIComponent(body)}`;
});
