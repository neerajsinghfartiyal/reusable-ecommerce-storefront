import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../../../component/navbar";
import Footer from "../../../component/footer";
import ProductGrid from "../../../component/Properties/ProductGrid.jsx";
import Switcher from "../../../component/switcher";
import { LuSearch } from "react-icons/lu";
import { getProducts, getCategories } from "../../../api/catalogApi.js";
import { mapProductsToCards } from "../../../lib/productMappers.js";

export default function Grid() {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = Number(searchParams.get('page') || 1) > 0 ? Number(searchParams.get('page') || 1) : 1;
    const category = searchParams.get('category') || '';
    const search = searchParams.get('search') || '';
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [searchDraft, setSearchDraft] = useState(search);
    const [syncedSearch, setSyncedSearch] = useState(search);

    if (search !== syncedSearch) {
        setSyncedSearch(search);
        setSearchDraft(search);
    }

    useEffect(() => {
        let active = true;

        const loadCategories = async () => {
            try {
                const data = await getCategories();
                if (active) setCategories(Array.isArray(data) ? data : []);
            } catch {
                if (active) setCategories([]);
            }
        };

        loadCategories();

        return () => {
            active = false;
        };
    }, []);

    useEffect(() => {
        let active = true;

        const loadProducts = async () => {
            setLoading(true);
            setError('');

            try {
                const result = await getProducts({
                    page,
                    limit: 9,
                    search: search || undefined,
                    category: category || undefined,
                    sortBy: 'createdAt',
                    sortOrder: 'desc',
                });

                if (!active) return;

                setProducts(mapProductsToCards(result.products));
                setPagination(result.pagination || {});
            } catch (err) {
                if (!active) return;
                setProducts([]);
                setPagination({});
                setError(err?.message || 'Could not load products.');
            } finally {
                if (active) setLoading(false);
            }
        };

        loadProducts();

        return () => {
            active = false;
        };
    }, [page, category, search]);

    const updateParams = (updates) => {
        const next = new URLSearchParams(searchParams);

        Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') {
                next.delete(key);
            } else {
                next.set(key, String(value));
            }
        });

        setSearchParams(next);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        updateParams({
            search: searchDraft.trim(),
            page: 1,
        });
    };

    const handleCategoryChange = (event) => {
        updateParams({
            category: event.target.value,
            page: 1,
        });
    };

    const totalPages = Number(pagination.totalPages || 1);
    const currentPage = Number(pagination.currentPage || page);

    return (
        <>
            <Navbar navClass="navbar-white" />
            <section className="relative table w-full py-32 lg:py-36 bg-[url('../../assets/images/bg/01.jpg')] bg-no-repeat bg-center bg-cover">
                <div className="absolute inset-0 bg-slate-900/80"></div>
                <div className="container relative">
                    <div className="grid grid-cols-1 text-center mt-10">
                        <h3 className="md:text-4xl text-3xl md:leading-normal leading-normal font-medium text-white">Products</h3>
                        <p className="text-white/70 mt-3">Browse published products from the live store catalog.</p>
                    </div>
                </div>
            </section>
            <div className="relative">
                <div className="shape overflow-hidden z-1 text-white dark:text-slate-900">
                    <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                    </svg>
                </div>
            </div>
            <div className="container relative -mt-16 z-1">
                <div className="grid grid-cols-1">
                    <form className="p-6 bg-white dark:bg-slate-900 rounded-xl shadow-md shadow-gray-200 dark:shadow-gray-700" onSubmit={handleSearchSubmit}>
                        <div className="registration-form text-dark text-start">
                            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 lg:gap-4 gap-6">
                                <div>
                                    <label className="form-label text-slate-900 dark:text-white font-medium">Search</label>
                                    <div className="filter-search-form relative filter-border mt-2">
                                        <LuSearch className="icons"/>
                                        <input
                                            name="search"
                                            type="text"
                                            value={searchDraft}
                                            onChange={(event) => setSearchDraft(event.target.value)}
                                            className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0"
                                            placeholder="Search products or SKU"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="product-category" className="form-label text-slate-900 dark:text-white font-medium">Category</label>
                                    <select
                                        id="product-category"
                                        value={category}
                                        onChange={handleCategoryChange}
                                        className="form-input filter-input-box bg-gray-50! dark:bg-slate-800! border-0 mt-2 w-full rounded-md"
                                    >
                                        <option value="">All categories</option>
                                        {categories.map((item) => (
                                            <option key={item._id || item.id} value={item._id || item.id}>
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex items-end">
                                    <button
                                        type="submit"
                                        className="btn bg-primary hover:bg-primary-dark border-primary hover:border-primary-dark text-white searchbtn submit-btn w-full h-12! rounded"
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <section className="relative lg:py-24 py-16">
                <div className="container">
                    <ProductGrid
                        products={products}
                        loading={loading}
                        error={error}
                        emptyMessage="No products match your filters."
                    />

                    {!loading && !error && products.length > 0 ? (
                        <div className="mt-10 flex items-center justify-center gap-3">
                            <button
                                type="button"
                                className="btn bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-md disabled:opacity-50"
                                disabled={currentPage <= 1}
                                onClick={() => updateParams({ page: currentPage - 1 })}
                            >
                                Previous
                            </button>
                            <span className="text-slate-500 text-sm">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                type="button"
                                className="btn bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-md disabled:opacity-50"
                                disabled={currentPage >= totalPages}
                                onClick={() => updateParams({ page: currentPage + 1 })}
                            >
                                Next
                            </button>
                        </div>
                    ) : null}
                </div>
            </section>
            <Footer />
            <Switcher />
        </>
    );

}
