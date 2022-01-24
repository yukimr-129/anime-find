export const visible = {
    hoverAction: {
        opacity: 1, 
        y: '0', 
        // transition: {duration: 0.45, delay: 1.4, ease: 'easeInOut', when: "beforeChildren", staggerChildren: 0.3}
    },
    hidden: {
        opacity: 0, 
        y: '100%',
    }
}

export const scale = {
    hoverAction: {
        opacity: 1, 
        scale: 1.1, 
        transition: { duration: 0.3 }
    }
}
