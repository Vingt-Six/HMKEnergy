@media (max-width: 768px) {
    .contact {
        padding: 5rem 1rem 2rem;
    }

    .contact-container {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .contact-info {
        grid-template-columns: 1fr 1fr;
    }

    .contact-form {
        padding: 1.5rem;
    }

    .contact-form h2 {
        font-size: 1.5rem;
    }
}



@media (max-width: 768px) {
    .menu-toggle {
        display: block;
    }

    .nav-links {
        display: none;
        position: fixed;
        top: 80px;
        left: 0;
        width: 100%;
        background: var(--white);
        padding: 1rem;
        flex-direction: column;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
    }

    .nav-links.active {
        display: flex;
    }

    .nav-links li {
        margin: 1rem 0;
    }

    .nav-links a {
        display: block;
        padding: 0.5rem 0;
    }

    .nav-links .cta-button {
        margin: 1rem 0;
        width: 100%;
        text-align: center;
    }

    .hero-content h1 {
        font-size: 2rem;
    }
}

@media (max-width: 768px) {
    .pricing-info {
        padding: 2rem;
        margin-top: 2rem;
    }

    .pricing-info h3 {
        font-size: 1.5rem;
    }

    .pricing-info p {
        font-size: 1rem;
    }

    .pricing-info .important {
        font-size: 1.1rem;
    }
}

@media (max-width: 768px) {
    .pricing-filters {
        padding: 0.3rem;
        margin: 2rem auto;
        border-radius: 30px;
    }

    .filter-btn {
        padding: 0.8rem 1.5rem;
        font-size: 1rem;
        min-width: 120px;
    }

    .pricing-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding: 0 1rem;
        min-height: 300px;
    }
}

@media (max-width: 768px) {
    .contact-container {
        grid-template-columns: 1fr;
    }

    .hero-contact {
        height: 300px;
    }

    .hero-contact h1 {
        font-size: 2.5rem;
    }

    .hero-contact p {
        font-size: 1.2rem;
    }

    .contact-form {
        padding: 2rem;
    }

    .faq-container {
        grid-template-columns: 1fr;
    }
}