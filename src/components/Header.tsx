import { memo, useCallback } from "react"
import styles from './Header.module.scss'
import { useTheme } from "../context/theme-context"


export const Header = memo(({onPageChange}: {onPageChange: (page: string) => void}) => {
    const {theme, setTheme} = useTheme()

    const toggleTheme = useCallback(() => {
        const newTheme = theme === 'dark' ? 'light' : 'dark'
        setTheme(newTheme)
    }, [theme, setTheme])
    
    return (
        <div className={styles['header']}>
            <div className={styles['navigation']}>
                <button onClick={() => onPageChange('travel')}>Travel Plan</button>
                <button onClick={() => onPageChange('tasks')}>Tasks List</button>
            </div>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </div>
    )
})
